import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu, Button, Divider, Layout, Typography } from "antd";
import { CustomClass } from "../../types";

import styles from "./Sider.module.css";

const { Sider } = Layout;
const { Title } = Typography;

interface CustomSiderArgs {
  selectedClass: CustomClass;
  classes: CustomClass[];
  changeSelectedClass: (newClassSelected: CustomClass) => void;
  setIsCreateClassModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomSider = ({
  selectedClass,
  classes,
  changeSelectedClass,
  setIsCreateClassModalVisible,
}: CustomSiderArgs) => {
  return (
    <Sider>
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
    </Sider>
  );
};

export default CustomSider;
