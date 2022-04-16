import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Router from "next/router";
import { Layout, Button } from "antd";
import Header from "../src/commonComponents/header";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
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
    <Layout>
      <Header isLogged={false} />
      <>
        Not signed in <br />
        <Button onClick={() => signIn()}>Sign in</Button>
      </>
    </Layout>
  );
};

export default LoginPage;
