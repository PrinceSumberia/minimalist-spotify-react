import React, { memo, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CurrentPlayListProvider,
  CurrentSongProvider,
  DataContext,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import "./SpotifyAppStyles.scss";

function SpotifyApp() {
  const {
    setProfileData,
    accessToken,
    setAccessToken,
    setIsAuthenticated,
    setDeviceID,
    setSdkPlayer,
  } = useContext(DataContext);

  const url = "https://api.spotify.com/v1/me";
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // Define the Spotify Connect device, getOAuthToken has an actual token
      // hardcoded for the sake of simplicity
      let player = new window.Spotify.Player({
        name: "SDK Player",
        getOAuthToken: (callback) => {
          callback(accessToken);
        },
        volume: 0.5,
      });

      setSdkPlayer(player);

      // Called when connected to the player created beforehand successfully
      player.addListener("ready", ({ device_id }) => {
        setDeviceID(device_id);
      });

      // Connect to the player created beforehand, this is equivalent to
      // creating a new device which will be visible for Spotify Connect
      player.connect();
    };
  }, [accessToken, setDeviceID, setSdkPlayer]);

  useEffect(() => {
    if (data.success) {
      setProfileData(data);
    } else if (data.status === 401) {
      setIsAuthenticated(false);
      setAccessToken(null);
    }
  }, [data, setProfileData, setAccessToken, setIsAuthenticated, accessToken]);

  useEffect(() => {
    notify();
  }, []);

  const notify = () =>
    toast.dark("Spotify Premium is Required To Play Tracks!");

  return (
    <CurrentPlayListProvider>
      <CurrentSongProvider>
        <div className="container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="mainContent">
            <Dashboard />
            <Footer />
          </div>
          <ToastContainer />
        </div>
      </CurrentSongProvider>
    </CurrentPlayListProvider>
  );
}

export default memo(SpotifyApp);
