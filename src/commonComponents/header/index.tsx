import Head from "next/head";
import { useRouter } from "next/router";
import { Layout, Menu, Button, Dropdown } from "antd";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { signIn, signOut } from "next-auth/react";
import styles from "./Header.module.css";
import MobileHomerMenu from "./MobileHomeMenu";

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
  const menu = (
    <Menu>
      <Menu.Item>
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
        {pathname.includes("home") && <MobileHomerMenu />}
        <Dropdown overlay={menu} placement="bottomRight">
          <Button className={styles.menuLink} type="text">
            <UserOutlined className={styles.loginIcon} />
          </Button>
        </Dropdown>
      </AntdHeader>
    </>
  );
};

export default Header;
