import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Layout } from "antd";
import { PrismaClient } from "@prisma/client";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getClasses } from "../src/api/classes";
import { CLASSES_QUERY } from "../src/constants";
import React from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { CustomClass } from "../src/types";
import HomePage from "../src/home/HomePage";
import CustomSider from "../src/home/Sider";
import CustomLayout from "../src/commonComponents/layout";
import HomeContextProvider from "../src/home/HomeContextProvider";

import styles from "../styles/Home.module.css";

const { Content, Sider } = Layout;

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
    <HomeContextProvider
      value={{
        selectedClass,
        classes,
        setIsCreateClassModalVisible,
        changeSelectedClass,
      }}
    >
      <CustomLayout
        headerProps={{
          isLogged: !!sessionData,
          pageTitle: "Your Cards!",
          pageDescription: "Learn with space repetition!",
        }}
      >
        <Sider className={styles.siderContainer}>
          <CustomSider />
        </Sider>
        <Content className={styles.classContent}>
          <HomePage
            updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
            isCreateClassModalVisible={isCreateClassModalVisible}
          />
        </Content>
      </CustomLayout>
    </HomeContextProvider>
  );
};

export default Home;
