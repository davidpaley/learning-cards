import React, { useState } from "react";
import type { NextPage } from "next";
import { PrismaClient, Card as CardType } from "@prisma/client";
import styles from "../../styles/playCards.module.css";
// TODO: delete this functions if they are not necessary
// import { getDate, viewCardsForDates } from "../../utils/dates";

import { Layout, Button, Row, Card, Typography, Col } from "antd";
const { Title } = Typography;
const { Header } = Layout;
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
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const cardsToShow = deck.cards.filter((card) => {
    const cardDate = new Date(card.nextReviewDate).setHours(0, 0, 0, 0);
    console.log({ cardDate });
    return currentDate >= cardDate;
  });
  return {
    props: {
      cardsToPlay: JSON.parse(JSON.stringify(cardsToShow)),
    },
  };
}

const PlayPage: NextPage<{ cardsToPlay: CardType[] }> = ({ cardsToPlay }) => {
  const [revealAnswerButton, setRevealAnswerButton] = useState(true);
  const [emptyCardsForToday, setEmptyCardsForToday] = useState(
    !cardsToPlay.length
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const goToNextCard = () => {
    setCurrentCardIndex((prevState) => prevState + 1);
    setRevealAnswerButton(true);
  };
  const nextCardAndSetLevel = (level) => {
    // TODO: modify current card according to answer

    const isLastCard = cardsToPlay.length === currentCardIndex + 1;
    if (isLastCard) {
      setEmptyCardsForToday(true);
      return;
    }
    goToNextCard();
  };
  return (
    <Layout>
      <Header />
      <div className={styles.siteCardBorderLessWrapper}>
        {!emptyCardsForToday ? (
          <>
            <Row align="middle" justify="center">
              <Card
                title={revealAnswerButton ? "Answer" : "Question"}
                //extra={<a href="#">More</a>}
                style={{ width: 900, height: 600 }}
              >
                <p className={styles.questionOrAnswer}>
                  {!revealAnswerButton
                    ? cardsToPlay[currentCardIndex].answer
                    : cardsToPlay[currentCardIndex].question}
                </p>
              </Card>
            </Row>

            <Row align="middle" justify="center">
              {revealAnswerButton ? (
                <Button
                  className={styles.revealAnswerButton}
                  type="primary"
                  shape="round"
                  onClick={() => setRevealAnswerButton(false)}
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
          </>
        ) : (
          <Row align="middle" justify="center">
            <Card
              title={"No cards for today"}
              //extra={<a href="#">More</a>}
              // TODO: Review styles of this card
              // style={{ width: 900, height: 600 }}
            >
              <p className={styles.questionOrAnswer}>
                {
                  "You don't have any cards to resolve today! Go enjoy the day =)"
                }
              </p>
            </Card>
          </Row>
        )}
      </div>
      );
    </Layout>
  );
};

export default PlayPage;
