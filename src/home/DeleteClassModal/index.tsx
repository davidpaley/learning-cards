import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { CLASSES_QUERY } from "../../../src/constants";

import { deleteClass, DeleteClass } from "../../../src/api/classes";

const DeleteClassModal = ({
  selectedClass,
  updateSelectedClassAfterDelete,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleDeleteClass } = useMutation(
    async (cardObject: DeleteClass) => {
      const response = await deleteClass(cardObject);
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
        updateSelectedClassAfterDelete();
      },
    }
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteClassSelected = () => {
    setIsModalVisible(false);
    handleDeleteClass(selectedClass);
  };
  return (
    <>
      <Button danger icon={<DeleteOutlined />} onClick={showModal}>
        Delete Class
      </Button>
      <Modal
        title="Delete Class"
        visible={isModalVisible}
        onOk={handleDeleteClassSelected}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete this class?</p>
      </Modal>
    </>
  );
};
export default DeleteClassModal;
