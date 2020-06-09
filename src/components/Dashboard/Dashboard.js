import React, { useContext, useEffect } from "react";
import {
  CurrentPlayListProvider,
  DataContext,
  TopPlayListProvider,
  NewAlbumProvider,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Profile from "../Profile/Profile";
import TopChart from "../TopChart/TopChart";
import TopTracks from "../TopTracks/TopTracks";
import "./DashBoardStyles.scss";
import NewAlbums from "../NewAlbums/NewAlbums";
import Footer from "../Footer/Footer";

export default function Dashboard() {
  const {
    setProfileData,
    accessToken,
    setAccessToken,
    setIsAuthenticated,
  } = useContext(DataContext);

  const url = "https://api.spotify.com/v1/me";
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("Spotify SDK is ready");
      console.log(window.Spotify.Player);
    };
  });

  useEffect(() => {
    if (data.success) {
      setProfileData(data);
    } else if (data.status === 401) {
      setIsAuthenticated(false);
      setAccessToken(null);
    }
  }, [data, setProfileData, setAccessToken, setIsAuthenticated]);

  return (
    <div className="container">
      <div className="sidebar">
        <Profile />
      </div>
      <div className="mainContent">
        <TopPlayListProvider>
          <TopChart />
        </TopPlayListProvider>
        <div className="main__content">
          <div className="main__toptracks">
            <CurrentPlayListProvider>
              <TopTracks />
            </CurrentPlayListProvider>
          </div>
          <div className="main__comingsoon">
            <NewAlbumProvider>
              <NewAlbums />
            </NewAlbumProvider>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
