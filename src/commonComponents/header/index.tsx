import Head from "next/head";
import { useRouter } from "next/router";
import { Layout, Menu, Button, Dropdown, MenuProps } from "antd";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { signIn, signOut } from "next-auth/react";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const { Header: AntdHeader } = Layout;

export interface HeaderProps {
  isLogged?: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

const Header = ({
  isLogged = true,
  pageTitle = "Learning Cards!",
  pageDescription = "Learn with space repetition!",
}: HeaderProps) => {
  const { pathname } = useRouter();
  const [visible, setVisible] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setVisible((prevState) => !prevState);
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const pathIncludeHome = pathname.includes("home");
  const pathIncludeEdit = pathname.includes("edit");
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="random">
        {isLogged ? (
          <a onClick={() => signOut()}>
            Log out <LogoutOutlined />
          </a>
        ) : (
          <a onClick={() => signIn()}>
            Log in <LoginOutlined />
          </a>
        )}
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AntdHeader className={styles.customHeader}>
        {pathIncludeEdit || pathIncludeHome ? (
          <MobileMenu isEditPage={pathIncludeEdit} />
        ) : (
          <div />
        )}
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          onVisibleChange={handleVisibleChange}
          visible={visible}
        >
          <Button className={styles.menuLink} type="text">
            <UserOutlined className={styles.loginIcon} />
          </Button>
        </Dropdown>
      </AntdHeader>
    </>
  );
};

export default Header;
