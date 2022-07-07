import { MenuOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import styles from "./MobileHomeMenu.module.css";

const MobileHomerMenu = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Button
        type="text"
        className={styles.menuContainer}
        onClick={() => setIsModalVisible(true)}
      >
        <MenuOutlined />
      </Button>
      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)}>
        <p>Are you want to delete this card?</p>
      </Modal>
    </>
  );
};

export default MobileHomerMenu;
