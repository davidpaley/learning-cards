import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { Button, Layout, Menu } from "antd";
import styles from "../styles/Home.module.css";
import { Typography } from "antd";
import Link from "next/link";

const { Content, Footer, Header } = Layout;

const Home: NextPage = ({ classesForDecks }: any) => {
  return (
    <Layout hasSider={false}>
      <Head>
        <title>Learning Cards!</title>
        <meta name="description" content="Learn with space repetition!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Learn!</Menu.Item>
          <Menu.Item key="2">How it works?</Menu.Item>
        </Menu>
      </Header>

      <Layout hasSider>
        <Content className={styles.main}>
          <h1 className={styles.title}>
            Your <a href="https://nextjs.org">Cards</a>
          </h1>

          <div className={styles.grid}>
            <h2>Start creating cards and learn more</h2>
            <br />
            {/* {decks && decks.map((deck: any) => (
              <p>{deck.name}</p>
            ))} */}

            {/* <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a> */}
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
