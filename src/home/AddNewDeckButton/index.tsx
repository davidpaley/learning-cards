import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useState } from "react";
import CreateNewDeckModal from "./CreateNewDeckModal";
import styles from "./index.module.css";

const AddNewDeckButton = ({ classId }: { classId: string }) => {
  console.log({ classId });
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
        New Deck
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
