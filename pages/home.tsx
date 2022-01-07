import type { NextPage } from "next";
import { Layout, Menu, Breadcrumb, Button, Row } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { Typography } from "antd";
import styles from "../styles/EditDecks.module.css";

const { Title } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const classesForDecks = await prisma.classForDecks.findMany();
  console.log({ classesForDecks });
  return {
    props: {
      classesForDecks: JSON.parse(JSON.stringify(classesForDecks)),
    },
  };
}

const Home: NextPage = ({ classesForDecks }: any) => {
  console.log({ classesForDecks });
  return (
    <Layout>
      <Head>
        <title>Learning Cards!</title>
        <meta name="description" content="Learn with space repetition!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <Sider>
          <div className={styles.sideButtonContainer}>
            <Button
              type="text"
              className={styles.createNewClass}
              icon={<PlusOutlined />}
            >
              <Title className={styles.createClassTitle} level={5}>
                Your Classes
              </Title>
            </Button>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">Hardcoded Class</Menu.Item>

            {classesForDecks &&
              classesForDecks.map((item, index) => (
                <Menu.Item key={index}>{item.name}</Menu.Item>
              ))}
          </Menu>
        </Sider>
        <Content className={styles.content}>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>Class Name</Breadcrumb.Item>
            </Breadcrumb>
            <Button
              danger
              className={styles.deleteCardButton}
              icon={<DeleteOutlined />}
            >
              Delete Class
            </Button>
          </Row>
          <div>CONTENT</div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
