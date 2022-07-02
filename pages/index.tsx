import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Layout, Menu, Row, Space } from "antd";
import styles from "../styles/Root.module.css";
import Link from "next/link";

const { Content, Footer, Header } = Layout;

const Home: NextPage = () => {
  return (
    <Layout hasSider={false}>
      <Head>
        <title>Learning Cards!</title>
        <meta name="description" content="Learn with space repetition!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Learn!</Menu.Item>
          <Menu.Item key="2">How it works?</Menu.Item>
        </Menu>
      </Header>

      <Layout hasSider>
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
          <div>
            <Link href="/home">
              <Button>START NOW</Button>
            </Link>
          </div>
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Footer>
    </Layout>
  );
};

export default Home;
