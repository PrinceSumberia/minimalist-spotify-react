import React, { createContext, useContext, useState } from "react";
import { GLOBAL_TRACK_ID } from "../constants/constants";
import { AccessTokenContext, AuthContext } from "./AuthContext";

export const DataContext = createContext();
export const TopPlayListContext = createContext();
export const CurrentPlayListContext = createContext();

export const DataProvider = (props) => {
  const [profileData, setProfileData] = useState("");
  const [deviceID, setDeviceID] = useState("");
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
        deviceID,
        setDeviceID,
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
  const [currentPlayListId, setCurrentPlayListId] = useState(GLOBAL_TRACK_ID);
  const [currentPlayList, setCurrentPlayList] = useState([]);
  const [currentSongURI, setCurrentSongURI] = useState("");

  return (
    <CurrentPlayListContext.Provider
      value={{
        currentPlayList,
        setCurrentPlayList,
        currentPlayListId,
        setCurrentPlayListId,
        currentSongURI,
        setCurrentSongURI,
      }}
    >
      {props.children}
    </CurrentPlayListContext.Provider>
  );
};
