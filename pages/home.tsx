import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
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
  EditOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { ClassForDecks, Deck } from "@prisma/client";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { getClasses } from "../src/api/classes";
import CreateClassModal from "../src/home/CreateClassModal";
import Header from "../src/commonComponents/header";
import { CLASSES_QUERY } from "../src/constants";
import React from "react";
import AddNewDeckButton from "../src/home/AddNewDeckButton";
import { getSession } from "next-auth/react";

const { Title } = Typography;

const { Content, Footer, Sider } = Layout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
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
    const currentClass = classes.find((c) => c.name === selectedClass?.name);
    if (currentClass) setSelectedClass(currentClass);
  }, [classes, setSelectedClass]);

  const changeSelectedClass = (newClassSelected: ClassProp) =>
    setSelectedClass(newClassSelected);

  const [isCreateClassModalVisible, setIsCreateClassModalVisible] =
    useState(false);

  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
            {!!classes?.length &&
              classes.map((item, index) => (
                <Menu.Item
                  key={index}
                  onClick={() => changeSelectedClass(item)}
                >
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
                renderItem={(deck) => (
                  <>
                    <List.Item
                      className={styles.classListItem}
                      key={deck.id}
                      // actions={[
                      //   <Progress
                      //     percent={30}
                      //     size="small"
                      //     status="active"
                      //     type="circle"
                      //   />,
                      // ]}
                      extra={
                        <Space
                          direction="horizontal"
                          size="large"
                          align="center"
                        >
                          <Link href={`/play/${deck.id}`}>
                            <PlayCircleOutlined
                              style={{
                                fontSize: "30px",
                                color: "#08c",
                                cursor: "pointer",
                              }}
                            />
                          </Link>
                          <Link href={`/edit/decks/${deck.id}`}>
                            <EditOutlined
                              style={{
                                fontSize: "30px",
                                color: "rgba(124, 130, 142, 0.6)",
                                cursor: "pointer",
                              }}
                            />
                          </Link>
                        </Space>
                      }
                    >
                      <List.Item.Meta
                        title={
                          <Typography.Link
                            href={`/play/${deck.id}`}
                            style={{ fontSize: "1.5rem" }}
                          >
                            {deck.name}
                          </Typography.Link>
                        }
                      />
                    </List.Item>
                    <Divider />
                  </>
                )}
              />
            )}
            <AddNewDeckButton classId={selectedClass?.id} />
            {!classes?.length && (
              <Button
                type="primary"
                icon={<PlusOutlined className={styles.createNewClassIcon} />}
                onClick={() => setIsCreateClassModalVisible(true)}
                style={{ width: "100%", height: "90px", fontSize: "1.5rem" }}
              >
                Create your first Class!
                {/* <Title className={styles.createClassTitle} level={3}>
                </Title> */}
              </Button>
            )}
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
