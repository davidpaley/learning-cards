import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu, Button, Divider, Typography } from "antd";
import { useContext } from "react";
import { HomeContext } from "../HomeContextProvider";

import styles from "./Sider.module.css";

const { Title } = Typography;

const CustomSider = () => {
  const {
    selectedClass,
    classes,
    changeSelectedClass,
    setIsCreateClassModalVisible,
  } = useContext(HomeContext);
  return (
    <>
      <Menu
        theme="dark"
        selectedKeys={[selectedClass?.id || "0"]}
        mode="inline"
      >
        {!!classes?.length &&
          classes.map((item) => (
            <Menu.Item key={item.id} onClick={() => changeSelectedClass(item)}>
              {item.name}
            </Menu.Item>
          ))}
      </Menu>

      <Divider style={{ border: "0.5px solid white" }} />
      <Button
        type="text"
        className={styles.createNewClass}
        icon={<PlusCircleOutlined className={styles.createNewClassIcon} />}
        onClick={() => setIsCreateClassModalVisible(true)}
      >
        <Title className={styles.createClassTitle} level={5}>
          Add Class
        </Title>
      </Button>
      <Divider style={{ border: "0.5px solid white" }} />
    </>
  );
};

export default CustomSider;
