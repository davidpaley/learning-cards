import Head from "next/head";
import { Layout, Menu, Button, Dropdown } from "antd";
import { LoginOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { signIn, signOut } from "next-auth/react";
import style from "./Header.module.css";

const { Header: AntdHeader } = Layout;

interface HeaderProps {
  isLogged?: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

const Header = ({
  isLogged = true,
  pageTitle = "Learning Cards!",
  pageDescription = "Learn with space repetition!",
}: HeaderProps) => {
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
      <AntdHeader className={style.customHeader}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button className={style.menuLink} type="text">
            <MenuOutlined />
          </Button>
        </Dropdown>
      </AntdHeader>
    </>
  );
};

export default Header;
