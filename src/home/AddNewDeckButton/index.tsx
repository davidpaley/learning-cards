import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useState } from "react";
import CreateNewDeckModal from "./CreateNewDeckModal";
import styles from "./AddNewDeckButton.module.css";

export const NEW_DECK_LABEL = "New Deck";

const AddNewDeckButton = ({ classId }: { classId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal((prevState) => !prevState);
  return (
    <>
      <Button
        type="text"
        className={styles.createNewDeckButton}
        icon={<PlusOutlined className={styles.icon} />}
        onClick={() => setShowModal(true)}
      >
        {NEW_DECK_LABEL}
      </Button>
      <CreateNewDeckModal
        classId={classId}
        close={handleShowModal}
        visible={showModal}
      />
    </>
  );
};

export default AddNewDeckButton;
