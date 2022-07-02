import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Router from "next/router";
import { Button, Image, Space } from "antd";
import { PrismaClient } from "@prisma/client";
import CustomLayout from "../src/commonComponents/layout";
import styles from "../styles/Login.module.css";

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    await prisma.user.upsert({
      where: {
        email: session.user.email,
      },
      update: {},
      create: {
        email: session.user.email as string,
      },
    });
    return {
      redirect: {
        destination: "/home",
      },
    };
  }

  return {
    props: {},
  };
}

const LoginPage: NextPage = () => {
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      Router.push("/home");
    }
  }, [data]);
  if (data) {
    return (
      <>
        Signed in as {data.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <CustomLayout
      headerProps={{
        isLogged: false,
        pageTitle: "Login",
        pageDescription: "Learn with space repetition!",
      }}
    >
      <Space className={styles.root} direction="vertical">
        <Image
          width={200}
          preview={false}
          src="https://madrerusia.com/wp-content/uploads/2017/10/920x312-Contacts-1.jpg"
        />

        <Button type="primary" onClick={() => signIn()}>
          Sign in
        </Button>
      </Space>
    </CustomLayout>
  );
};

export default LoginPage;
