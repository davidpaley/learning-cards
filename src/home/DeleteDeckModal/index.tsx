import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { CLASSES_QUERY } from "../../../src/constants";

import { deleteDeck, DeleteDeck } from "../../../src/api/decks";

const DeleteDeckModal = ({ selectedDeck, updateSelectedDeckAfterDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleDeleteDeck } = useMutation(
    async (cardObject: DeleteDeck) => {
      const response = await deleteDeck(cardObject);
      const data = await response.json();
      return data;
    },
    {
      onError: (err) => {
        console.error(err);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([CLASSES_QUERY]);
      },

      onSuccess: () => {
        updateSelectedDeckAfterDelete();
      },
    }
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteDeckSelected = () => {
    setIsModalVisible(false);
    handleDeleteDeck(selectedDeck);
  };
  return (
    <>
      <Button
        danger
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={showModal}
      />
      <Modal
        title="Delete Deck"
        visible={isModalVisible}
        onOk={handleDeleteDeckSelected}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you want to delete this deck?</p>
      </Modal>
    </>
  );
};
export default DeleteDeckModal;
