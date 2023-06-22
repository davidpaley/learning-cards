import React, { useContext, useState } from "react";
import Link from "next/link";
import { Breadcrumb, Button, Row, List, Divider, Space } from "antd";
import { EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import CreateClassModal from "../CreateClassModal";

import AddNewDeckButton from "../AddNewDeckButton";
import DeleteClassModal from "../DeleteClassModal";
import DeleteDeckModal from "../DeleteDeckModal";
import styles from "./HomePage.module.css";
import { HomeContext } from "../HomeContextProvider";
import { InstructionBlock } from "../../instructionBlock";

export const CREATE_YOUR_FIRST_CLASS_LABEL = "+ Create your first Class!";

interface HomePageArgs {
  updateSelectedClassAfterDelete: () => void;
  isCreateClassModalVisible: boolean;
}

export const NEW_DECK_LABEL = "+ Create New Deck";

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
  const [showDeckModal, setShowDeckModal] = useState(false);
  const handleDeckModal = () => setShowDeckModal((prevState) => !prevState);
  return (
    <>
      <Row align="middle" justify="space-between">
        <Breadcrumb>
          <Breadcrumb.Item>
            {selectedClass && `${selectedClass?.name || ""} class`}
          </Breadcrumb.Item>
        </Breadcrumb>
        {classes?.length ? (
          <div className={styles.actionButtons}>
            <Button
              className={styles.newDeckButton}
              onClick={() => setShowDeckModal(true)}
            >
              {NEW_DECK_LABEL}
            </Button>

            <DeleteClassModal
              selectedClass={selectedClass}
              updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
            />
          </div>
        ) : (
          <Button
            type="primary"
            onClick={() => setIsCreateClassModalVisible(true)}
          >
            {CREATE_YOUR_FIRST_CLASS_LABEL}
          </Button>
        )}
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
        <InstructionBlock
          onClick={() => setIsCreateClassModalVisible(true)}
          preInstructionString="You don't have any class created yet, do you want to "
          link="create "
          postInstructionString="one?"
        />
      ) : (
        <AddNewDeckButton
          showDeckModal={showDeckModal}
          setShowDeckModal={setShowDeckModal}
          handleDeckModal={handleDeckModal}
          classId={selectedClass?.id}
          emptyDecks={!selectedClass?.decks?.length}
        />
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
