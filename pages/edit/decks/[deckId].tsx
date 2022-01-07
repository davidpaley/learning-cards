import type { NextPage } from "next";
import styles from "../../../styles/EditDecks.module.css";

import { Layout, Menu, Breadcrumb, Card, Button, Input, Row } from "antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const Home: NextPage = () => {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" style={{ padding: 5, minHeight: "150px" }}>
              {/* <Button
                  type="ghost"
                  shape="circle"
                  className={styles.deleteCardButton}
                  icon={<DeleteOutlined />}
                /> */}
              <Card
                title="Card title 1"
                bordered={false}
                className={styles.cards}
              />
            </Menu.Item>
            <Menu.Item key="2" style={{ padding: 5, minHeight: "150px" }}>
              <Card
                title="Card title 2"
                bordered={false}
                className={styles.cards}
              />
            </Menu.Item>
          </Menu>
          <div className={styles.sideButtonContainer}>
            <Button
              type="text"
              className={styles.createNewCardButton}
              icon={<PlusOutlined />}
            >
              Create New Card
            </Button>
          </div>
        </Sider>
        <Content>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>Name of the Class</Breadcrumb.Item>
              <Breadcrumb.Item>Name of the Deck</Breadcrumb.Item>
              <Breadcrumb.Item>Card1</Breadcrumb.Item>
            </Breadcrumb>
            <Button
              danger
              className={styles.deleteCardButton}
              icon={<DeleteOutlined />}
            >
              Delete Card
            </Button>
          </Row>
          <div>
            <div className={styles.card}>
              <div className={styles.textarea}>
                <TextArea
                  maxLength={1000}
                  style={{ padding: 10 }}
                  className={styles.questionText}
                  onChange={onChange}
                  rows={10}
                />
              </div>
              <div className={styles.textarea}>
                <TextArea
                  maxLength={1000}
                  className={styles.answerText}
                  onChange={onChange}
                  rows={20}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
