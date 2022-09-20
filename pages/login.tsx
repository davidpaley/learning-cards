import React, { useEffect } from "react";
import type { NextPage } from "next";
import {
  useSession,
  signIn,
  signOut,
  getSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";

import Router from "next/router";
import { Button, Space } from "antd";
import { PrismaClient } from "@prisma/client";
import CustomLayout from "../src/commonComponents/layout";
import styles from "../styles/Login.module.css";
import { GithubOutlined } from "@ant-design/icons";
import { BuiltInProviderType } from "next-auth/providers";

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
    props: {
      providers: await getProviders(),
    },
  };
}

const LoginPage: NextPage<any> = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) => {
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
        <GithubOutlined style={{ fontSize: "20rem", width: "20rem" }} />
        <Button type="default" onClick={() => signIn(providers.github.id)}>
          Sign in with Github
        </Button>
      </Space>
    </CustomLayout>
  );
};

export default LoginPage;
