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
  EditOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { PrismaClient } from "@prisma/client";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { getClasses } from "../src/api/classes";
import CreateClassModal from "../src/home/CreateClassModal";
import Header from "../src/commonComponents/header";
import { CLASSES_QUERY } from "../src/constants";
import React from "react";
import AddNewDeckButton from "../src/home/AddNewDeckButton";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { CustomClass } from "../src/types";
import DeleteClassModal from "../src/home/DeleteClassModal";
import DeleteDeckModal from "../src/home/DeleteDeckModal";

const { Title } = Typography;

const { Content, Footer, Sider } = Layout;

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const session: Session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([CLASSES_QUERY], async () => {
    const foundClasses = await prisma.classForDecks.findMany({
      where: {
        userEmail: session.user.email,
      },
      select: {
        name: true,
        decks: true,
        id: true,
      },
    });
    return JSON.parse(JSON.stringify(foundClasses));
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: classes } = useQuery(
    [CLASSES_QUERY],
    async () => {
      const { data: classesForDecks } = await getClasses();
      return classesForDecks;
    },
    {
      enabled: !!sessionData,
    }
  );
  const [selectedClass, setSelectedClass] = useState<CustomClass | null>(
    classes?.length ? classes[0] : null
  );

  useEffect(() => {
    const classFound = classes.find(
      (singleClass) => singleClass.name === selectedClass.name
    );
    setSelectedClass(classFound);
  }, [classes]);

  const changeSelectedClass = (newClassSelected: CustomClass) => {
    setSelectedClass(newClassSelected);
  };

  const updateSelectedClassAfterDelete = () => {
    setSelectedClass(classes.length ? classes[0] : null);
  };
  const [isCreateClassModalVisible, setIsCreateClassModalVisible] =
    useState(false);

  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            selectedKeys={[selectedClass?.id || "0"]}
            mode="inline"
          >
            {!!classes?.length &&
              classes.map((item) => (
                <Menu.Item
                  key={item.id}
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
              <Breadcrumb.Item>{`${
                selectedClass?.name || ""
              } decks`}</Breadcrumb.Item>
            </Breadcrumb>
            <DeleteClassModal
              selectedClass={selectedClass}
              updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
            />
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
                      extra={
                        <Space
                          direction="horizontal"
                          size="large"
                          align="center"
                        >
                          <DeleteDeckModal
                            selectedDeck={deck}
                            updateSelectedDeckAfterDelete={
                              updateSelectedClassAfterDelete
                            }
                          />
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

            {!classes?.length ? (
              <Button
                type="primary"
                icon={<PlusOutlined className={styles.createNewClassIcon} />}
                onClick={() => setIsCreateClassModalVisible(true)}
                style={{ width: "100%", height: "90px", fontSize: "1.5rem" }}
              >
                Create your first Class!
              </Button>
            ) : (
              <AddNewDeckButton classId={selectedClass?.id} />
            )}
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
      <CreateClassModal
        onSuccess={changeSelectedClass}
        close={() => setIsCreateClassModalVisible(false)}
        visible={isCreateClassModalVisible}
      />
    </Layout>
  );
};

export default Home;
