import { useState } from "react";
import type { NextPage } from "next";
import { Layout, Menu, Breadcrumb, Button, Row } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Head from "next/head";
import { Typography } from "antd";
import { ClassForDecks } from "@prisma/client";
import { useQuery } from "react-query";
import styles from "../styles/EditDecks.module.css";
import { getClasses } from "../src/api/classes";

const { Title } = Typography;

const { Header, Content, Footer, Sider } = Layout;

export async function getServerSideProps() {
  const classesForDecks = await getClasses();
  console.log({ classesForDecks });
  return {
    props: {
      classesForDecks: JSON.parse(JSON.stringify(classesForDecks)),
    },
  };
}

type HomeProps = { classesForDecks: ClassForDecks[] };

const Home: NextPage<HomeProps> = ({ classesForDecks }) => {
  console.log({ classesForDecks });
  const { data: classesData } = useQuery(
    "classes",
    async () => {
      const classesForDecks = await getClasses();
      return classesForDecks;
    },
    {
      initialData: classesForDecks as any,
    }
  );
  const [selectedClass, setSelectedClass] = useState(
    classesForDecks?.length ? classesForDecks[0] : null
  );

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
          <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
            {classesData?.length &&
              classesData.map((item, index) => (
                <Menu.Item key={index}>{item.name}</Menu.Item>
              ))}
          </Menu>
        </Sider>
        <Content className={styles.content}>
          <Row align="middle" justify="space-between">
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>{selectedClass?.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Button
              danger
              className={styles.deleteCardButton}
              icon={<DeleteOutlined />}
            >
              Delete Class
            </Button>
          </Row>
          <div>{selectedClass?.name}</div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
