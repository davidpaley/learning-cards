import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";
import styles from "../../../styles/EditDecks.module.css";
import { useQuery } from "react-query";
import { getDeck } from "../../../src/api/decks";
import { DECK_QUERY } from "../../../src/constants";

import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Button,
  Input,
  Row,
  Form,
  Divider,
} from "antd";

import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

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
  const { data: deckForCards } = useQuery(
    [DECK_QUERY],
    async () => {
      const deckResponse = await getDeck(deck.id);
      return deckResponse;
    },
    {
      initialData: deck as any,
    }
  );

  const [selectedCard, setSelectedCard] = useState(
    deck?.cards?.length ? deck?.cards[0] : null
  );

  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [deck, selectedCard]);

  const handleFormSubmit = (value) => {
    //console.log("Change:", JSON.parse(JSON.stringify(value)));
    console.log({ answer: JSON.parse(JSON.stringify(value.answer)) });
    console.log({ question: JSON.parse(JSON.stringify(value.question)) });
  };

  const cardSelected = (event) => {
    const cardSelected = deckForCards.cards.find(
      (card) => card.id === event.key
    );
    setSelectedCard(cardSelected);
  };
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            defaultSelectedKeys={[selectedCard?.id]}
            mode="inline"
            onClick={cardSelected}
          >
            {deckForCards.cards &&
              deckForCards.cards.map((card, index) => {
                return (
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
                );
              })}
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
              <Breadcrumb.Item>{deckForCards.name}</Breadcrumb.Item>
              <Breadcrumb.Item>{deckForCards.name}</Breadcrumb.Item>
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
            <Form
              className={styles.card}
              form={form}
              onFinish={handleFormSubmit}
              initialValues={{
                question: selectedCard?.question,
                answer: selectedCard?.answer,
              }}
              // preserve={false}
            >
              <Form.Item name="question">
                <Input.TextArea
                  maxLength={1000}
                  className={styles.questionText}
                  rows={10}
                />
              </Form.Item>
              <Divider />
              <Form.Item name="answer">
                <Input.TextArea
                  maxLength={1000}
                  className={styles.answerText}
                  rows={20}
                />
              </Form.Item>
              <Button
                className={styles.saveEditButton}
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
              >
                Save Card
              </Button>
            </Form>
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
