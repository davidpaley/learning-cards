import React, { Dispatch, SetStateAction, useContext } from "react";
import { Menu, Card, Button } from "antd";
import styles from "./SiderCards.module.css";

import { PlusOutlined } from "@ant-design/icons";
import { EditContext } from "../EditContextProvider";

const EditCardsMenu = ({
  isMobile,
  setIsModalVisible,
}: {
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>;
  isMobile?: boolean;
}) => {
  const {
    selectedCard,
    handleSelectedCard,
    deckForCards,
    handleCreateOrUpdateCard,
  } = useContext(EditContext);
  const handleCreateNewCard = () => {
    const newCard = {
      question: "  ",
      answer: "  ",
      nextReviewDate: new Date(),
      deckId: deckForCards?.id,
      level: 0,
    };
    handleCreateOrUpdateCard(newCard);
    if (setIsModalVisible) {
      setIsModalVisible(false);
    }
  };

  const onHandleSelected = (event) => {
    handleSelectedCard(event);
    if (setIsModalVisible) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <Menu
        theme={!isMobile ? "dark" : undefined}
        selectedKeys={[selectedCard?.id]}
        mode="inline"
        onClick={onHandleSelected}
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
          className={!isMobile ? styles.createNewCardButton : ""}
          icon={<PlusOutlined />}
          onClick={handleCreateNewCard}
        >
          Create New Card
        </Button>
      </div>
    </>
  );
};
export default EditCardsMenu;
