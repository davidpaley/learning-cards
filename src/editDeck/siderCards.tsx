import React from "react";
import styles from "../../styles/EditDecks.module.css";
import { Layout, Menu, Card, Button } from "antd";

const { Sider } = Layout;

import { PlusOutlined } from "@ant-design/icons";

const SidebarCards = ({
  selectedCard,
  cardSelected,
  deckForCards,
  handleCreateOrUpdateCard,
}) => {
  const handleCreateNewCard = () => {
    const newCard = {
      question: "  ",
      answer: "  ",
      nextReviewDate: new Date(),
      deckId: deckForCards?.id,
      level: 0,
    };
    handleCreateOrUpdateCard(newCard);
  };
  return (
    <Sider>
      <Menu
        theme="dark"
        selectedKeys={[selectedCard?.id]}
        mode="inline"
        onClick={cardSelected}
      >
        {!!deckForCards?.cards?.length &&
          deckForCards?.cards.map(({ id, question }) => {
            return (
              <Menu.Item key={id} style={{ padding: 5, minHeight: "150px" }}>
                <Card
                  title={question}
                  bordered={false}
                  className={styles.cards}
                />
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
export default SidebarCards;
