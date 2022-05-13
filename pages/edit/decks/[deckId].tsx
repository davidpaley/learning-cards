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
import Header from "../../../src/commonComponents/header";
import { Layout, Breadcrumb, Row, Form } from "antd";

import { CreateOrUpdateCard, createOrUpdateCard } from "../../../src/api/cards";
import SidebarCards from "../../../src/editDeck/siderCards";
import FormCardsEdit from "../../../src/editDeck/formCards";
import DeleteCardModal from "../../../src/editDeck/deleteCards";
import { getSession } from "next-auth/react";
import { HomeOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
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
    return JSON.parse(JSON.stringify(deck));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      deckId,
    },
  };
}

export type HomeProp = {
  // deck: {
  //   id: string;
  //   classId: string;
  //   name: string;
  //   creationDate: Date;
  //   cards: Card[];
  //   classOfDeck: ClassForDecks;
  // };
  deckId: string;
};

const Home: NextPage<HomeProp> = ({ deckId }: HomeProp) => {
  const queryClient = useQueryClient();
  const { data: deckForCards } = useQuery([CARD_QUERY, deckId], async () => {
    const deckResponse = await getDeck(deckId);
    return deckResponse.data;
  });

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
        console.log(err);
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

  const handleFormSubmit = (value: { question: string; answer: string }) => {
    const card = selectedCard ? selectedCard : { deckId: deckId };
    handleCreateOrUpdateCard({ ...card, ...value });
  };

  const cardSelected = (event) => {
    const cardSelected = deckForCards?.cards.find(
      (card) => card.id === event.key
    );
    setSelectedCard(cardSelected);
  };

  const setSelectedCardWhenDeleteCard = () => {
    setSelectedCard(deckForCards?.cards[0]);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarCards
          selectedCard={selectedCard}
          cardSelected={cardSelected}
          deckForCards={deckForCards}
          handleCreateOrUpdateCard={handleCreateOrUpdateCard}
        />
        <Content className={styles.editDeckContent}>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item href="/home">
                <HomeOutlined />
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
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
