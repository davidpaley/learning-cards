import React from "react";
import styles from "../../styles/EditDecks.module.css";
import { Layout, Menu, Card, Button } from "antd";

const { Sider } = Layout;

import { PlusOutlined } from "@ant-design/icons";

const SiderCardsPage = ({
  selectedCard,
  cardSelected,
  deckForCards,
  handleCreateOrUpdateCard,
  handleNewCard,
}) => {
  const handleCreateNewCard = () => {
    const newCard = {
      question: "  ",
      answer: "  ",
      selectedCard: {
        nextReviewDate: new Date(),
        deckId: selectedCard.deckId,
        level: 0,
      },
    };
    handleCreateOrUpdateCard(newCard);
    handleNewCard(newCard);
  };
  return (
    <Sider>
      <Menu
        theme="dark"
        defaultSelectedKeys={[selectedCard?.id]}
        mode="inline"
        onClick={cardSelected}
      >
        {deckForCards?.cards.map((card, index) => {
          return (
            <Menu.Item key={card.id} style={{ padding: 5, minHeight: "150px" }}>
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
          onClick={handleCreateNewCard}
        >
          Create New Card
        </Button>
      </div>
    </Sider>
  );
};
export default SiderCardsPage;
