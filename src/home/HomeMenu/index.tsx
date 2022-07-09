import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu, Button, Divider, Typography } from "antd";
import { Dispatch, SetStateAction, useContext } from "react";
import { HomeContext } from "../HomeContextProvider";

import styles from "./HomeMenu.module.css";

const { Title } = Typography;

const HomeMenu = ({
  isMobile,
  setIsModalVisible,
}: {
  isMobile?: boolean;
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    selectedClass,
    classes,
    changeSelectedClass,
    setIsCreateClassModalVisible,
  } = useContext(HomeContext);
  return (
    <>
      {isMobile && <Title level={5}>Select a Class</Title>}
      <Menu
        theme={!isMobile ? "dark" : undefined}
        selectedKeys={[selectedClass?.id || "0"]}
        mode="inline"
      >
        {!!classes?.length &&
          classes.map((item) => (
            <Menu.Item
              key={item.id}
              onClick={() => {
                changeSelectedClass(item);
                !!setIsModalVisible && setIsModalVisible(false);
              }}
            >
              {item.name}
            </Menu.Item>
          ))}
      </Menu>

      <Divider className={styles.divider} />
      <Button
        type="text"
        className={styles.createNewClass}
        onClick={() => setIsCreateClassModalVisible(true)}
      >
        <Title className={styles.createClassTitle} level={5}>
          <PlusCircleOutlined className={styles.createNewClassIcon} /> Add Class
        </Title>
      </Button>
      <Divider className={styles.divider} />
    </>
  );
};

export default HomeMenu;
