"use client";

import { createContext, useState } from "react";

export const userContext = createContext<any>(null);

const ContextApiWrapper = ({ children }: any) => {
  const [nameOfUser, setNameOfUser] = useState<any>("");

  return (
    <>
      {
        <userContext.Provider value={{ nameOfUser, setNameOfUser }}>
          {children}
        </userContext.Provider>
      }
    </>
  );
};

export default ContextApiWrapper;
