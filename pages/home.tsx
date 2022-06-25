import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Layout } from "antd";
import { PrismaClient } from "@prisma/client";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getClasses } from "../src/api/classes";
import Header from "../src/commonComponents/header";
import { CLASSES_QUERY } from "../src/constants";
import React from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { CustomClass } from "../src/types";
import HomePage from "../src/home/HomePage";
import CustomSider from "../src/home/Sider";

import styles from "../styles/Home.module.css";

const { Content, Footer } = Layout;
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const session: Session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([CLASSES_QUERY], async () => {
    const foundClasses = await prisma.classForDecks.findMany({
      where: {
        userEmail: session.user.email,
      },
      select: {
        name: true,
        decks: true,
        id: true,
      },
    });
    return JSON.parse(JSON.stringify(foundClasses));
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: classes } = useQuery(
    [CLASSES_QUERY],
    async () => {
      const { data: classesForDecks } = await getClasses();
      return classesForDecks;
    },
    {
      enabled: !!sessionData,
    }
  );
  const [selectedClass, setSelectedClass] = useState<CustomClass | null>(
    classes?.length ? classes[0] : null
  );

  useEffect(() => {
    const classFound = classes.find(
      (singleClass) => singleClass.name === selectedClass.name
    );
    setSelectedClass(classFound);
  }, [classes]);

  const changeSelectedClass = (newClassSelected: CustomClass) => {
    setSelectedClass(newClassSelected);
  };

  const updateSelectedClassAfterDelete = () => {
    setSelectedClass(classes.length ? classes[0] : null);
  };
  const [isCreateClassModalVisible, setIsCreateClassModalVisible] =
    useState(false);

  return (
    <Layout>
      <Header />
      <Layout>
        <CustomSider
          selectedClass={selectedClass}
          classes={classes}
          changeSelectedClass={changeSelectedClass}
          setIsCreateClassModalVisible={setIsCreateClassModalVisible}
        />
        <Content className={styles.classContent}>
          <HomePage
            selectedClass={selectedClass}
            changeSelectedClass={changeSelectedClass}
            updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
            classes={classes}
            isCreateClassModalVisible={isCreateClassModalVisible}
            setIsCreateClassModalVisible={setIsCreateClassModalVisible}
          />
        </Content>
      </Layout>
      <Footer className={styles.footer}>©2022 Created by David Paley</Footer>
    </Layout>
  );
};

export default Home;
