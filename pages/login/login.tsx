import React from "react";
import type { NextPage } from "next";
import { User, PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";

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
      user: JSON.parse(JSON.stringify(user.classes[0])),
    },
  };
}

const LoginPage: NextPage<{ user }> = ({ user }) => {
  console.log({ usuario: user.userEmail });
  const { data: session } = useSession();
  console.log({ session });
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