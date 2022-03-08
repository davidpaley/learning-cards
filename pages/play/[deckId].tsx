import React, { useState } from "react";
import type { NextPage } from "next";
import { PrismaClient, Card as CardType } from "@prisma/client";
import styles from "../../styles/PlayCards.module.css";
// TODO: delete this functions if they are not necessary
// import { getDate, viewCardsForDates } from "../../utils/dates";

import { Layout, Button, Row, Card, Typography, Col } from "antd";
const { Title, Text } = Typography;
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
                <div className={styles.replyContainer}>
                  <Text className={styles.answerQuestion} type="secondary">
                    How was your answer?
                  </Text>

                  <div className={styles.allButtonLevel}>
                    <Col span={12}>
                      <Button
                        type="primary"
                        className={styles.buttonLevel1}
                        onClick={() => {
                          nextCardAndSetLevel("1");
                        }}
                      >
                        <Title className={styles.answerTitle} level={5}>
                          Bad 👎
                        </Title>
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        className={styles.buttonLevel2}
                        onClick={() => {
                          nextCardAndSetLevel("2");
                        }}
                      >
                        <Title className={styles.answerTitle} level={5}>
                          Good 👍
                        </Title>
                      </Button>
                    </Col>
                  </div>
                </div>
              )}
            </Row>
          </>
        ) : (
          <Row align="middle" justify="center">
            <Card
              // title={"No cards for today"}
              //extra={<a href="#">More</a>}
              // TODO: Review styles of this card
              style={{ width: 900, height: 600, backgroundColor: "white" }}
              cover={
                <img
                  alt="example"
                  src="https://t4.ftcdn.net/jpg/03/12/44/31/360_F_312443165_8EfqDsrod8dsIV5sTw73RZohUuKob2Ia.jpg"
                />
              }
            >
              <Card.Meta
                title="All your cards for today are done!"
                description="You don't have any more cards to resolve today! Go enjoy the day =)"
              />
            </Card>
          </Row>
        )}
      </div>
      );
    </Layout>
  );
};

export default PlayPage;
