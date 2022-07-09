import React, { useState } from "react";
import styles from "../../styles/EditDecks.module.css";
import { Button, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { CARD_QUERY } from "../../src/constants";

import { deleteCard, DeleteCard } from "../../src/api/cards";

const DeleteCardModal = ({ selectedCard, setSelectedCardWhenDeleteCard }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleDeleteCard } = useMutation(
    async (cardObject: DeleteCard) => {
      const response = await deleteCard(cardObject);
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

      onSuccess: () => {
        setSelectedCardWhenDeleteCard();
      },
    }
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteCardSelected = () => {
    setIsModalVisible(false);
    handleDeleteCard(selectedCard.id);
  };
  return (
    <>
      <Button
        danger
        className={styles.deleteCardButton}
        icon={<DeleteOutlined />}
        onClick={showModal}
      >
        Delete Card
      </Button>
      <Modal
        title="Delete Card"
        visible={isModalVisible}
        onOk={handleDeleteCardSelected}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you want to delete this card?</p>
      </Modal>
    </>
  );
};
export default DeleteCardModal;
