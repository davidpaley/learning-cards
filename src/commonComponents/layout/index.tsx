import Header, { HeaderProps } from "../header";
import { Layout } from "antd";
import { Footer } from "antd/lib/layout/layout";

import styles from "./Layout.module.css";

interface CustomLayoutProps {
  headerProps?: HeaderProps;
  children: React.ReactNode;
}

const CustomLayout = ({ headerProps, children }: CustomLayoutProps) => {
  return (
    <Layout>
      <Header {...headerProps} />
      <Layout>{children}</Layout>
      <Footer className={styles.footer}>©2022 Created by David Paley</Footer>
    </Layout>
  );
};

export default CustomLayout;
