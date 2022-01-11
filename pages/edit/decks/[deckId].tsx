import React, { useState } from "react";
import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";
import styles from "../../../styles/EditDecks.module.css";

import { Layout, Menu, Breadcrumb, Card, Button, Input, Row } from "antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
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
    },
  });
  return {
    props: {
      deck: JSON.parse(JSON.stringify(deck)),
    },
  };
}

const Home: NextPage = ({ deck }: any) => {
  const [selectedCard, setSelectedCard] = useState(
    deck?.length ? deck[0] : null
  );
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  const cardSelected = (event) => {
    const cardSelected = deck.cards.find((card) => card.id === event.key);
    setSelectedCard(cardSelected);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onClick={cardSelected}
          >
            {deck.cards &&
              deck.cards.map((card, index) => (
                <Menu.Item
                  key={card.id}
                  style={{ padding: 5, minHeight: "150px" }}
                >
                  <Card
                    title={card.question}
                    bordered={false}
                    className={styles.cards}
                  />
                  {/* <Button
                  type="ghost"
                  shape="circle"
                  className={styles.deleteCardButton}
                  icon={<DeleteOutlined />}
                /> */}
                </Menu.Item>
              ))}
          </Menu>
          <div className={styles.sideButtonContainer}>
            <Button
              type="text"
              className={styles.createNewCardButton}
              icon={<PlusOutlined />}
            >
              Create New Card
            </Button>
          </div>
        </Sider>
        <Content>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>{deck.classOfDeck.name}</Breadcrumb.Item>
              <Breadcrumb.Item>{deck.name}</Breadcrumb.Item>
              {/* <Breadcrumb.Item>{selectedCard.id}</Breadcrumb.Item> */}
            </Breadcrumb>
            <Button
              danger
              className={styles.deleteCardButton}
              icon={<DeleteOutlined />}
            >
              Delete Card
            </Button>
          </Row>
          <div>
            <div className={styles.card}>
              <div className={styles.textarea}>
                <TextArea
                  maxLength={1000}
                  style={{ padding: 10 }}
                  className={styles.questionText}
                  onChange={onChange}
                  rows={10}
                  value={selectedCard.question}
                />
              </div>
              <div className={styles.textarea}>
                <TextArea
                  maxLength={1000}
                  className={styles.answerText}
                  onChange={onChange}
                  rows={20}
                  value={selectedCard.answer}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
