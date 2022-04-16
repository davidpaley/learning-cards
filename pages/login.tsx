import React, { useEffect } from "react";
import type { NextPage } from "next";
import { User, PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import Router from "next/router";
import { Layout, Button } from "antd";
const { Header } = Layout;

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { query } = context;
  console.log({ query });
  const user = await prisma.user.findUnique({
    where: {
      email: "david.paleyy@gmail.com",
    },
    select: {
      classes: true,
    },
  });
  return {
    props: {
      user: user ? JSON.parse(JSON.stringify(user?.classes[0])) : null,
    },
  };
}

const LoginPage: NextPage<{ user }> = ({ user }) => {
  console.log({ usuario: user?.userEmail });
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/home");
    }
  }, [session]);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <Layout>
      <Header />
      <>
        Not signed in <br />
        <Button onClick={() => signIn()}>Sign in</Button>
      </>
    </Layout>
  );
};

export default LoginPage;
