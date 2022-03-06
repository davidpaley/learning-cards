import { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Row,
  List,
  Divider,
  Space,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { Typography } from "antd";
import { ClassForDecks, Deck } from "@prisma/client";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { getClasses } from "../src/api/classes";
import CreateClassModal from "../src/home/CreateClassModal";
import { CLASSES_QUERY } from "../src/constants";
import React from "react";
import AddNewDeckButton from "../src/home/AddNewDeckButton";

const { Title } = Typography;

const { Header, Content, Footer, Sider } = Layout;

export async function getServerSideProps() {
  const classesForDecks = await getClasses();

  return {
    props: {
      classesForDecks: JSON.parse(JSON.stringify(classesForDecks)),
    },
  };
}

interface ClassProp extends ClassForDecks {
  decks: Deck[];
}

type HomeProps = { classesForDecks: ClassProp[] };

const Home: NextPage<HomeProps> = ({ classesForDecks }) => {
  const { data: classes } = useQuery(
    [CLASSES_QUERY],
    async () => {
      const classesForDecks = await getClasses();
      return classesForDecks;
    },
    {
      initialData: classesForDecks as any,
    }
  );
  const [selectedClass, setSelectedClass] = useState<ClassProp>(
    classesForDecks?.length ? classesForDecks[0] : null
  );

  useEffect(() => {
    const currentClass = classes.find((c) => c.name === selectedClass.name);
    setSelectedClass(currentClass);
  }, [classes, setSelectedClass]);

  const changeSelectedClass = (newClassSelected: ClassProp) =>
    setSelectedClass(newClassSelected);

  const [isCreateClassModalVisible, setIsCreateClassModalVisible] =
    useState(false);

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
          <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
            {classes?.length &&
              classes.map((item, index) => (
                <Menu.Item
                  key={index}
                  onClick={() => changeSelectedClass(item)}
                >
                  {item.name}
                </Menu.Item>
              ))}
          </Menu>
          <Button
            type="text"
            className={styles.createNewClass}
            icon={<PlusOutlined className={styles.createNewClassIcon} />}
            onClick={() => setIsCreateClassModalVisible(true)}
          >
            <Title className={styles.createClassTitle} level={5}>
              Your Classes
            </Title>
          </Button>
          {/* <div className={styles.sideButtonContainer}>
          </div> */}
        </Sider>
        <Content className={styles.classContent}>
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
          <div className={styles.classList}>
            <Divider />
            {!!selectedClass?.decks?.length && (
              <List
                itemLayout="vertical"
                size="large"
                dataSource={selectedClass.decks}
                // footer={
                //   <div>
                //     <b>ant design</b> footer part
                //   </div>
                // }
                renderItem={(deck) => (
                  <List.Item
                    className={styles.classListItem}
                    key={deck.id}
                    // actions={[
                    //   <PlayCircleOutlined />,
                    //   <EditOutlined />,
                    //   <IconText
                    //     icon={PlayCircleOutlined}
                    //     text="Play!"
                    //     key="list-vertical-like-o"
                    //   />,
                    //   <IconText
                    //     icon={EditOutlined}
                    //     text="Edit Card"
                    //     key="list-vertical-message"
                    //   />,
                    // ]}
                    extra={
                      <Space direction="horizontal" size="large" align="center">
                        <PlayCircleOutlined
                          style={{ fontSize: "30px", color: "#08c" }}
                        />
                        <EditOutlined
                          style={{
                            fontSize: "30px",
                            color: "rgba(124, 130, 142, 0.6)",
                          }}
                        />
                      </Space>
                    }
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Link
                          href="#"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {deck.name}
                        </Typography.Link>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
            <Divider />

            <AddNewDeckButton classId={selectedClass.id} />
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
      <CreateClassModal
        close={() => setIsCreateClassModalVisible(false)}
        visible={isCreateClassModalVisible}
      />
    </Layout>
  );
};

export default Home;
