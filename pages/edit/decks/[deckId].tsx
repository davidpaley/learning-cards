import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { PrismaClient, Card, Deck } from "@prisma/client";
import styles from "../../../styles/EditDecks.module.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getDeck } from "../../../src/api/decks";
import { CARD_QUERY } from "../../../src/constants";

import { Layout, Breadcrumb, Row, Form } from "antd";

import { CreateOrUpdateCard, createOrUpdateCard } from "../../../src/api/cards";
import SidebarCards from "../../../src/editDeck/siderCards";
import FormCardsEdit from "../../../src/editDeck/formCards";
import DeleteCardModal from "../../../src/editDeck/deleteCards";

const { Header, Content, Footer } = Layout;
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { query } = context;
  const deck = await prisma.deck.findUnique({
    where: {
      id: query.deckId,
    },
    select: {
      cards: true,
      name: true,
      classOfDeck: true,
      id: true,
    },
  });
  return {
    props: {
      deck: JSON.parse(JSON.stringify(deck)),
    },
  };
}

const Home: NextPage<{ deck: Deck }> = ({ deck }) => {
  const queryClient = useQueryClient();
  const { data: deckForCards } = useQuery(
    [CARD_QUERY],
    async () => {
      const deckResponse = await getDeck(deck.id);
      return deckResponse;
    },
    {
      initialData: deck as Deck,
    }
  );

  const [selectedCard, setSelectedCard] = useState<Card>(
    deck?.cards?.length ? deck?.cards[0] : null
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
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([CARD_QUERY]);
      },

      onSuccess: (successData) => {
        setSelectedCard(successData);
      },
    }
  );

  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [deck, selectedCard]);

  const handleFormSubmit = (value: { question: string; answer: string }) => {
    handleCreateOrUpdateCard({ ...selectedCard, ...value });
  };

  const cardSelected = (event) => {
    const cardSelected = deckForCards.cards.find(
      (card) => card.id === event.key
    );
    setSelectedCard(cardSelected);
  };

  const setSelectedCardWhenDeleteCard = () => {
    setSelectedCard(deck?.cards[0]);
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
        <Content>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>{deckForCards.name}</Breadcrumb.Item>
              <Breadcrumb.Item>{deckForCards.name}</Breadcrumb.Item>
              {/* <Breadcrumb.Item>{selectedCard.id}</Breadcrumb.Item> */}
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
