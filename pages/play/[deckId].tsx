import React, { useState } from "react";
import type { NextPage } from "next";
import { PrismaClient, Card as CardType } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import styles from "../../styles/PlayDeck.module.css";
import { cardLevels, CARD_QUERY } from "../../src/constants";
import { CreateOrUpdateCard, createOrUpdateCard } from "../../src/api/cards";
import { Button, Row, Card, Typography, Col, Divider, Breadcrumb } from "antd";
import { getSession } from "next-auth/react";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import CustomLayout from "../../src/commonComponents/layout";
const { Title, Text } = Typography;

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
    return currentDate >= cardDate && !card.isDone;
  });
  return {
    props: {
      cardsToPlay: JSON.parse(JSON.stringify(cardsToShow)),
      deckName: JSON.parse(JSON.stringify(deck.name)),
    },
  };
}

const PlayPage: NextPage<{ cardsToPlay: CardType[]; deckName: string }> = ({
  cardsToPlay,
  deckName,
}) => {
  const queryClient = useQueryClient();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [revealAnswerButton, setRevealAnswerButton] = useState(true);
  const [emptyCardsForToday, setEmptyCardsForToday] = useState(
    !cardsToPlay.length
  );
  const goToNextCard = () => {
    setCurrentCardIndex((prevState) => prevState + 1);
    setRevealAnswerButton(true);
  };

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
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([CARD_QUERY]);
      },
    }
  );

  const handleUpdateCard = (value: {
    level: number;
    isDone?: boolean;
    nextReviewDate?: Date;
  }) => {
    const selectedCard = cardsToPlay[currentCardIndex];
    handleCreateOrUpdateCard({ ...selectedCard, ...value });
  };

  const handleNextCardAndSetLevel = (theAnswerWasGood: boolean) => {
    let daysForLevel = 0;
    let newLevel = cardsToPlay[currentCardIndex].level;
    if (theAnswerWasGood) {
      newLevel = cardsToPlay[currentCardIndex].level + 1;
      daysForLevel = cardLevels[newLevel];
      if (newLevel >= Object.keys(cardLevels).length) {
        handleUpdateCard({
          level: newLevel,
          isDone: true,
        });
        goToNextCard();
        return;
      }
    } else {
      daysForLevel = cardLevels[1];
      newLevel = 1;
    }
    const newNextReviewDate = new Date();
    newNextReviewDate.setDate(newNextReviewDate.getDate() + daysForLevel);
    handleUpdateCard({
      level: newLevel,
      nextReviewDate: newNextReviewDate,
    });
    const isLastCard = cardsToPlay.length === currentCardIndex + 1;
    if (isLastCard) {
      setEmptyCardsForToday(true);
      return;
    }
    goToNextCard();
  };
  return (
    <CustomLayout
      headerProps={{
        isLogged: true,
        pageTitle: "Play with your Cards!",
        pageDescription: "Learn with space repetition!",
      }}
    >
      <div className={styles.siteCardBorderLessWrapper}>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link href="/home">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">{deckName}</Breadcrumb.Item>
          <Breadcrumb.Item>{"Play Deck Cards"}</Breadcrumb.Item>
        </Breadcrumb>
        {!emptyCardsForToday ? (
          <>
            <Row align="middle" justify="center">
              <Card
                title={revealAnswerButton ? "Answer" : "Question"}
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
                          handleNextCardAndSetLevel(false);
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
                          handleNextCardAndSetLevel(true);
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
              // TODO: Review styles of this card
              style={{ width: 900, height: 600, backgroundColor: "white" }}
              cover={
                <img
                  alt="example"
                  src="https://t4.ftcdn.net/jpg/03/12/44/31/360_F_312443165_8EfqDsrod8dsIV5sTw73RZohUuKob2Ia.jpg"
                />
              }
            >
              <Divider />
              <Card.Meta
                title="All your cards for today are done!"
                description="You don't have any more cards to resolve today! Go enjoy the day =)"
              />
            </Card>
          </Row>
        )}
      </div>
    </CustomLayout>
  );
};

export default PlayPage;
