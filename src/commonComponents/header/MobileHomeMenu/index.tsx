import { MenuOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import HomeMenu from "../../../home/HomeMenu";
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
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <HomeMenu setIsModalVisible={setIsModalVisible} isMobile />
      </Modal>
    </>
  );
};

export default MobileHomerMenu;
