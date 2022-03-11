import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import styles from "../styles/Home.module.css";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { Typography } from "antd";

const { Title } = Typography;

const prisma = new PrismaClient();

const { Content, Footer, Header } = Layout;

export async function getServerSideProps() {
  const classesForDecks = await prisma.classForDecks.findMany();
  return {
    props: {
      classesForDecks: JSON.parse(JSON.stringify(classesForDecks)),
    },
  };
}
const Home: NextPage = ({ classesForDecks }: any) => {
  const saveDeck = async () => {
    const body = {
      name: `Created Deck ${Math.random()}`,
      userEmail: "david.paleyy@gmail.com",
    };
    const response = await fetch(`/api/decks`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseJson = await response.json();
  };

  const addNewClass = () => {
    console.log("add new class");
  };
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
            Your <a href="https://nextjs.org">Classes</a>
          </h1>

          <div className={styles.grid}>
            <h2>Decks added to the database</h2>
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
            <h2>New Deck &rarr;</h2>
            <input />
            <Button onClick={() => saveDeck()}>SAVE DECK</Button>
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
