import React, { createContext, useContext, useState } from "react";
import { AccessTokenContext, AuthContext } from "./AuthContext";

export const DataContext = createContext();
export const TopPlayListContext = createContext();
export const CurrentPlayListContext = createContext();

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

export const CurrentPlayListProvider = (props) => {
  const [currentPlayList, setCurrentPlayList] = useState([]);
  return (
    <CurrentPlayListContext.Provider
      value={{ currentPlayList, setCurrentPlayList }}
    >
      {props.children}
    </CurrentPlayListContext.Provider>
  );
};
