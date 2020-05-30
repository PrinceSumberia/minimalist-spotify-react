import React, { createContext, useState, useContext } from "react";
import { AccessTokenContext } from "./AuthContext";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [profileData, setProfileData] = useState("");
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);

  return (
    <DataContext.Provider
      value={{ profileData, setProfileData, accessToken, setAccessToken }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
