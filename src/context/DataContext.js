import React, { createContext, useState, useContext } from "react";
import { AccessTokenContext, AuthContext } from "./AuthContext";

export const DataContext = createContext();
export const TopPlayListContext = createContext();

export const DataProvider = (props) => {
  const [profileData, setProfileData] = useState("");
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <DataContext.Provider
      value={{
        profileData,
        setProfileData,
        accessToken,
        setAccessToken,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const TopPlayListProvider = (props) => {
  const [topPlayList, setTopPlayList] = useState([]);
  return (
    <TopPlayListContext.Provider value={{ topPlayList, setTopPlayList }}>
      {props.children}
    </TopPlayListContext.Provider>
  );
};
