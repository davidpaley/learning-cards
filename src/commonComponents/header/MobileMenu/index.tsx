import { MenuOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import EditCardsMenu from "../../../editDeck/EditCardsMenu";
import HomeMenu from "../../../home/HomeMenu";
import styles from "./MobileHomeMenu.module.css";

const MobileMenu = ({ isEditPage }: { isEditPage?: boolean }) => {
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
        {isEditPage ? (
          <EditCardsMenu setIsModalVisible={setIsModalVisible} isMobile />
        ) : (
          <HomeMenu setIsModalVisible={setIsModalVisible} isMobile />
        )}
      </Modal>
    </>
  );
};

export default MobileMenu;
