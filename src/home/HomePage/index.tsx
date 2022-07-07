import React, { useContext } from "react";

import Link from "next/link";
import { Breadcrumb, Button, Row, List, Divider, Space } from "antd";
import {
  EditOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import CreateClassModal from "../CreateClassModal";

import AddNewDeckButton from "../AddNewDeckButton";
import DeleteClassModal from "../DeleteClassModal";
import DeleteDeckModal from "../DeleteDeckModal";
import styles from "./HomePage.module.css";
import { HomeContext } from "../HomeContextProvider";

export const CREATE_YOUR_FIRST_CLASS_LABEL = "Create your first Class!";

interface HomePageArgs {
  updateSelectedClassAfterDelete: () => void;
  isCreateClassModalVisible: boolean;
}

const HomePage = ({
  updateSelectedClassAfterDelete,
  isCreateClassModalVisible,
}: HomePageArgs) => {
  const {
    selectedClass,
    classes,
    changeSelectedClass,
    setIsCreateClassModalVisible,
  } = useContext(HomeContext);
  return (
    <>
      <Row align="middle" justify="space-between">
        <Breadcrumb>
          <Breadcrumb.Item>{`${
            selectedClass?.name || ""
          } decks`}</Breadcrumb.Item>
        </Breadcrumb>
        <DeleteClassModal
          selectedClass={selectedClass}
          updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
        />
      </Row>

      <Divider />
      {!!selectedClass?.decks?.length && (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={selectedClass.decks}
          renderItem={(deck) => (
            <>
              <List.Item
                key={deck.id}
                className={styles.listElementContainer}
                extra={
                  <Space direction="horizontal" size="large" align="center">
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
                    <DeleteDeckModal
                      selectedDeck={deck}
                      updateSelectedDeckAfterDelete={
                        updateSelectedClassAfterDelete
                      }
                    />
                  </Space>
                }
              >
                <List.Item.Meta
                  title={
                    <Typography.Link style={{ fontSize: "1.5rem" }}>
                      <Link href={`/play/${deck.id}`}>{deck.name}</Link>
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
          {CREATE_YOUR_FIRST_CLASS_LABEL}
        </Button>
      ) : (
        <AddNewDeckButton classId={selectedClass?.id} />
      )}

      <CreateClassModal
        onSuccess={changeSelectedClass}
        close={() => setIsCreateClassModalVisible(false)}
        visible={isCreateClassModalVisible}
      />
    </>
  );
};

export default HomePage;
