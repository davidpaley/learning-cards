import { Card } from "@prisma/client";
import React from "react";
import { UseMutateFunction } from "react-query";
import { CreateOrUpdateCard } from "../../api/cards";
import { DeckResponse } from "../../types";

interface EditContextProps {
  selectedCard: Card;
  handleSelectedCard: (event: any) => void;
  deckForCards: DeckResponse;
  handleCreateOrUpdateCard: UseMutateFunction<
    any,
    unknown,
    CreateOrUpdateCard,
    unknown
  >;
}

interface EditContextProviderProps {
  children: React.ReactNode;
  value: EditContextProps;
}

export const EditContext = React.createContext<EditContextProps>(null);

const EditContextProvider = ({ children, value }: EditContextProviderProps) => (
  <EditContext.Provider value={value}>{children}</EditContext.Provider>
);

export default EditContextProvider;
