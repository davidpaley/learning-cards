import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/EditDecks.module.css";

import { Layout, Menu, Breadcrumb, Card, Button, Tooltip } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home: NextPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className={styles.addcard}>
          <Button shape="circle" icon={<PlusOutlined />} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ paddingTop: 40 }}
        >
          <Menu.Item key="1" style={{ padding: 5, minHeight: "150px" }}>
            <Card
              title="Card title 1"
              bordered={false}
              className={styles.cards}
            >
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
            </Card>
          </Menu.Item>
          <Menu.Item key="2" style={{ padding: 5, minHeight: "150px" }}>
            <Card
              title="Card title 2"
              bordered={false}
              className={styles.cards}
            >
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
            </Card>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header />
        <Content>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Card1</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <div className={styles.card}>
              <div className={styles.title}>Card Title</div>
              <div className={styles.description}>
                <p>Card content</p>
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
