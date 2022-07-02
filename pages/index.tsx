import type { NextPage } from "next";
import { Button, Layout, Space } from "antd";
import styles from "../styles/Root.module.css";
import Link from "next/link";
import CustomLayout from "../src/commonComponents/layout";
import { useSession } from "next-auth/react";

const { Content } = Layout;

const RootPage: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <CustomLayout
      headerProps={{
        isLogged: !!sessionData,
        pageTitle: "Learning Cards!",
        pageDescription: "Learn with space repetition!",
      }}
    >
      <Content className={styles.main}>
        <h1 className={styles.title}>
          <Space>
            {`Your`} <div className={styles.highlightedTitle}>Cards</div>
          </Space>
        </h1>

        <div className={styles.grid}>
          <h2>Start creating cards and learn more</h2>
          <br />
        </div>
        <Space>
          <Button
            href="https://github.com/davidpaley/learning-cards"
            target="_blank"
          >
            Learn about this project
          </Button>
          <Link href="/home">
            <Button type="primary">START NOW</Button>
          </Link>
        </Space>
      </Content>
    </CustomLayout>
  );
};

export default RootPage;
