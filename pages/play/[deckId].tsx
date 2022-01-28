import React, { useState } from "react";
import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";
import styles from "../../styles/playCards.module.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getDate, viewCardsForDates } from "../../utils/dates";

import { Layout, Button, Row, Card, Typography, Col } from "antd";
const { Title } = Typography;
const { Header } = Layout;
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const cardsToShow = [];
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
  const showCards = deck.cards.map((item) => {
    const dateCard = getDate(item.nextReviewDate);
    const viewCards = viewCardsForDates(dateCard, getDate(new Date()));
    if (viewCards) {
      cardsToShow.push(item);
    }
  });
  return {
    props: {
      cardsToPlay: JSON.parse(JSON.stringify(cardsToShow)),
    },
  };
}

const Home: NextPage<{ cardsToPlay: any }> = ({ cardsToPlay }) => {
  const [answerButton, setAnswerButton] = useState(true);
  const nextCardAndSetLevel = (level) => {
    setAnswerButton(true);
  };
  return (
    <Layout>
      <Header />
      <div className={styles.siteCardBorderLessWrapper}>
        <Row align="middle" justify="center">
          <Card
            title={answerButton ? "Answer" : "Question"}
            //extra={<a href="#">More</a>}
            style={{ width: 900, height: 600 }}
          >
            <p className={styles.questionOrAnswer}>
              {!answerButton ? cardsToPlay[0].answer : cardsToPlay[0].question}
            </p>
          </Card>
        </Row>
        ;
        <Row align="middle" justify="center">
          {answerButton ? (
            <Button
              className={styles.revealAnswerButton}
              type="primary"
              shape="round"
              onClick={() => setAnswerButton(false)}
            >
              <Title className={styles.answerTitle} level={5}>
                Reveal Answer
              </Title>
            </Button>
          ) : (
            <div className={styles.allButtonLevel}>
              <Col span={4}>
                <Button
                  type="primary"
                  className={styles.buttonLevel1}
                  onClick={() => {
                    nextCardAndSetLevel("1");
                  }}
                >
                  <Title className={styles.answerTitle} level={5}>
                    1
                  </Title>
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  className={styles.buttonLevel2}
                  onClick={() => {
                    nextCardAndSetLevel("2");
                  }}
                >
                  <Title className={styles.answerTitle} level={5}>
                    2
                  </Title>
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  className={styles.buttonLevel3}
                  onClick={() => {
                    nextCardAndSetLevel("3");
                  }}
                >
                  <Title className={styles.answerTitle} level={5}>
                    3
                  </Title>
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  className={styles.buttonLevel4}
                  onClick={() => {
                    nextCardAndSetLevel("4");
                  }}
                >
                  <Title className={styles.answerTitle} level={5}>
                    4
                  </Title>
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  className={styles.buttonLevel5}
                  onClick={() => {
                    nextCardAndSetLevel("5");
                  }}
                >
                  <Title className={styles.answerTitle} level={5}>
                    5
                  </Title>
                </Button>
              </Col>
            </div>
          )}
        </Row>
      </div>
      );
    </Layout>
  );
};

export default Home;
