import { WarningOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import CustomLayout from "../src/commonComponents/layout";

import styles from "../styles/404Page.module.css";

const NotFoundPage: NextPage = () => {
  return (
    <CustomLayout
      headerProps={{
        isLogged: false,
        pageTitle: "Your Cards!",
        pageDescription: "Learn with space repetition!",
      }}
    >
      <Space className={styles.root} direction="vertical">
        <Typography.Title level={1}>Not Found page!</Typography.Title>
        <WarningOutlined className={styles.iconStyle} />
        <Link href="/">
          <Button type="default">Go to Home page</Button>
        </Link>
      </Space>
    </CustomLayout>
  );
};

export default NotFoundPage;
