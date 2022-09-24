import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { PrismaClient, Card } from "@prisma/client";
import styles from "../../../styles/EditDecks.module.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  dehydrate,
} from "react-query";
import { getDeck } from "../../../src/api/decks";
import { CARD_QUERY } from "../../../src/constants";
import { Layout, Breadcrumb, Row, Form } from "antd";
import { CreateOrUpdateCard, createOrUpdateCard } from "../../../src/api/cards";
import EditCardsMenu from "../../../src/editDeck/EditCardsMenu";
import FormCardsEdit from "../../../src/editDeck/FormCards";
import DeleteCardModal from "../../../src/editDeck/DeleteCard";
import { getSession } from "next-auth/react";
import { HomeOutlined } from "@ant-design/icons";
import { CardForm } from "../../../src/types";
import Link from "next/link";
import CustomLayout from "../../../src/commonComponents/layout";
import EditContextProvider from "../../../src/editDeck/EditContextProvider";
import { getDeckWithSortedCards } from "../../../src/utils/deckEdition";

const { Content } = Layout;
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const {
    query: { deckId },
  } = context;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([CARD_QUERY, deckId], async () => {
    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
      select: {
        cards: true,
        name: true,
        classOfDeck: true,
        id: true,
      },
    });
    const deckObject = JSON.parse(JSON.stringify(deck));

    return getDeckWithSortedCards(deckObject);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      deckId,
    },
  };
}

export type HomeProp = {
  deckId: string;
};

const EditDeck: NextPage<HomeProp> = ({ deckId }: HomeProp) => {
  const queryClient = useQueryClient();
  const { data: deckForCards } = useQuery(
    [CARD_QUERY, deckId],
    async () => {
      const { data } = await getDeck(deckId);
      return getDeckWithSortedCards(data);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const [selectedCard, setSelectedCard] = useState<Card>(
    deckForCards?.cards?.length ? deckForCards?.cards[0] : null
  );

  const { mutate: handleCreateOrUpdateCard } = useMutation(
    async (cardObject: CreateOrUpdateCard) => {
      const response = await createOrUpdateCard(cardObject);
      const data = await response.json();
      return data;
    },
    {
      onError: (err) => {
        console.error(err);
      },
      onSettled: () => {
        queryClient.invalidateQueries([CARD_QUERY]);
      },

      onSuccess: (successData) => {
        setSelectedCard(successData);
      },
    }
  );

  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [deckForCards, selectedCard]);

  const handleFormSubmit = (value: CardForm) => {
    const card = selectedCard ? selectedCard : { deckId: deckId };
    handleCreateOrUpdateCard({ ...card, ...value });
  };

  const handleSelectedCard = (event) => {
    const cardSelected = deckForCards?.cards.find(
      (card) => card.id === event.key
    );
    setSelectedCard(cardSelected);
  };

  const setSelectedCardWhenDeleteCard = () => {
    setSelectedCard(deckForCards?.cards[0]);
  };
  const { Sider } = Layout;
  return (
    <EditContextProvider
      value={{
        selectedCard: selectedCard,
        handleSelectedCard: handleSelectedCard,
        deckForCards: deckForCards,
        handleCreateOrUpdateCard: handleCreateOrUpdateCard,
      }}
    >
      <CustomLayout
        headerProps={{
          isLogged: true,
          pageTitle: "Edit Cards!",
          pageDescription: "Learn with space repetition!",
        }}
      >
        <Sider className={styles.siderContainer}>
          <EditCardsMenu />
        </Sider>
        <Content className={styles.editDeckContent}>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>
                <Link href="/home">
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">{deckForCards?.name}</Breadcrumb.Item>
              <Breadcrumb.Item>{"Edit Deck"}</Breadcrumb.Item>
            </Breadcrumb>
            <DeleteCardModal
              selectedCard={selectedCard}
              setSelectedCardWhenDeleteCard={setSelectedCardWhenDeleteCard}
            />
          </Row>
          <FormCardsEdit
            handleFormSubmit={handleFormSubmit}
            selectedCard={selectedCard}
            form={form}
          />
        </Content>
      </CustomLayout>
    </EditContextProvider>
  );
};

export default EditDeck;
