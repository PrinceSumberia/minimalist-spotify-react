import React, { memo, useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import FadeIn from "react-fade-in";
import Lootie from "react-lottie";
import { toast, ToastContainer } from "react-toastify";

import Browse from "../Browse/Browse";
import Category from "../Category/Category";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import Library from "../Library/Library";
import Sidebar from "../Sidebar/Sidebar";
import TrackAnalysis from "../TrackAnalysis/TrackAnalysis";
import SearchResult from "../SearchResult/SearchResult";

import {
  CurrentPlayListProvider,
  CurrentSongProvider,
  DataContext,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";

import * as animationData from "../../assets/loading.json";

import "react-toastify/dist/ReactToastify.css";
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [data] = useFetchData("", url, headers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMobile = window.matchMedia("only screen and (max-width: 760px)")
      .matches;

    if (isMobile) {
      setLoading(false);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      let player = new window.Spotify.Player({
        name: "SDK Player",
        getOAuthToken: (callback) => {
          callback(accessToken);
        },
        volume: 0.5,
      });
      setSdkPlayer(player);
      player.addListener("ready", ({ device_id }) => {
        setDeviceID(device_id);
        setLoading(false);
      });
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

  return loading ? (
    <div className="loading">
      <Lootie options={defaultOptions} height={300} width={300} />
    </div>
  ) : (
    <CurrentPlayListProvider>
      <CurrentSongProvider>
        <FadeIn>
          <div className="container">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="mainContent">
              <Switch>
                <Route
                  exact
                  path="/tracks/:id"
                  render={(props) => <TrackAnalysis {...props} />}
                />
                <Route exact path="/library" render={() => <Library />} />
                <Route exact path="/browse" render={() => <Browse />} />
                <Route
                  exact
                  path="/search"
                  render={(props) => <SearchResult {...props} />}
                />
                <Route
                  exact
                  path="/browse/category/:id"
                  render={(props) => <Category {...props} />}
                />
                <Route exact path="/" render={() => <Dashboard />} />
              </Switch>
              <Footer />
            </div>
            <ToastContainer />
          </div>
        </FadeIn>
      </CurrentSongProvider>
    </CurrentPlayListProvider>
  );
}

export default memo(SpotifyApp);
