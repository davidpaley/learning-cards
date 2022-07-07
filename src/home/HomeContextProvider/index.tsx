import React from "react";
import { CustomClass } from "../../types";

interface HomeContextProps {
  selectedClass: CustomClass;
  classes: CustomClass[];
  changeSelectedClass: (newClassSelected: CustomClass) => void;
  setIsCreateClassModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HomeContextProviderProps {
  children: React.ReactNode;
  value: HomeContextProps;
}

export const HomeContext = React.createContext<HomeContextProps>(null);

const HomeContextProvider = ({ children, value }: HomeContextProviderProps) => (
  <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
);

export default HomeContextProvider;
