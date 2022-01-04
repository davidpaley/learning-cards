import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Layout } from "antd";
import styles from "../../../styles/EditDecks.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Edit Deck</title>
        <meta name="description" content="Learn with space repetition!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Edit Deck</h1>
      </main>

      <footer className={styles.footer}>
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
      </footer>
    </Layout>
  );
};

export default Home;
