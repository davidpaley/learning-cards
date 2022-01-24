import React from "react";
import styles from "../../styles/EditDecks.module.css";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { CARD_QUERY } from "../../src/constants";

import { deleteCard, DeleteCard } from "../../src/api/cards";

const DeleteCard = ({ selectedCard, setSelectedCardWhenDeleteCard }) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    mutate: handleDeleteCard,
  } = useMutation(
    async (cardObject: DeleteCard) => {
      const response = await deleteCard(cardObject);
      const data = await response.json();
      return data;
    },
    {
      onError: (err) => {
        console.log(err);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([CARD_QUERY]);
      },

      onSuccess: () => {
        setSelectedCardWhenDeleteCard();
        //ver que hago si es success
      },
    }
  );
  const handleDeleteCardSelected = () => {
    handleDeleteCard(selectedCard.id);
  };
  return (
    <>
      <Button
        danger
        className={styles.deleteCardButton}
        icon={<DeleteOutlined />}
        onClick={handleDeleteCardSelected}
      >
        Delete Card
      </Button>
    </>
  );
};
export default DeleteCard;
