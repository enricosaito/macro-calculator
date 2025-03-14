import { createContext, useContext, useState, ReactNode } from "react";

interface CardHeightContextType {
  minCardHeight: number;
  setMinCardHeight: React.Dispatch<React.SetStateAction<number>>;
}

const CardHeightContext = createContext<CardHeightContextType>({
  minCardHeight: 0,
  setMinCardHeight: () => {},
});

export const useCardHeight = () => useContext(CardHeightContext);

export const CardHeightProvider = ({ children }: { children: ReactNode }) => {
  const [minCardHeight, setMinCardHeight] = useState<number>(0);

  return (
    <CardHeightContext.Provider value={{ minCardHeight, setMinCardHeight }}>{children}</CardHeightContext.Provider>
  );
};
