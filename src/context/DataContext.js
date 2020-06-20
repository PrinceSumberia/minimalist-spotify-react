import React, { createContext, useContext, useState } from "react";
import { GLOBAL_TRACK_ID } from "../constants/constants";
import { AccessTokenContext, AuthContext } from "./AuthContext";

export const DataContext = createContext();
export const TopPlayListContext = createContext();
export const CurrentPlayListContext = createContext();
export const NewAlbumContext = createContext();
export const CurrentSongContext = createContext();

export const DataProvider = (props) => {
  const [sdkPlayer, setSdkPlayer] = useState(null);
  const [profileData, setProfileData] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
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
        isPlaying,
        setIsPlaying,
        sdkPlayer,
        setSdkPlayer,
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
  const [currentPlayListType, setCurrentPlayListType] = useState({
    name: "Most Popular",
    type: "playlists",
  });

  return (
    <CurrentPlayListContext.Provider
      value={{
        currentPlayList,
        setCurrentPlayList,
        currentPlayListId,
        setCurrentPlayListId,
        currentPlayListType,
        setCurrentPlayListType,
      }}
    >
      {props.children}
    </CurrentPlayListContext.Provider>
  );
};

export const NewAlbumProvider = (props) => {
  const [newAlbum, setNewAlbum] = useState([]);
  return (
    <NewAlbumContext.Provider value={{ newAlbum, setNewAlbum }}>
      {props.children}
    </NewAlbumContext.Provider>
  );
};

export const CurrentSongProvider = (props) => {
  const [currentSong, setCurrentSong] = useState({});
  return (
    <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
      {props.children}
    </CurrentSongContext.Provider>
  );
};
