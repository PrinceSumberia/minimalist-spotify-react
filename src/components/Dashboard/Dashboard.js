import React, { useContext, useEffect } from "react";
import {
  CurrentPlayListProvider,
  DataContext,
  TopPlayListProvider,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Profile from "../Profile/Profile";
import TopChart from "../TopChart/TopChart";
import TopTracks from "../TopTracks/TopTracks";
import "./DashBoardStyles.scss";

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
    async function waitForSpotifyWebPlaybackSDKToLoad() {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify);
          };
        }
      });
    }
    async function waitUntilUserHasSelectedPlayer(sdk) {
      return new Promise((resolve) => {
        let interval = setInterval(async () => {
          let state = await sdk.getCurrentState();
          if (state !== null) {
            resolve(state);
            clearInterval(interval);
          }
        });
      });
    }
    (async () => {
      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
      console.log("The Web Playback SDK has loaded.");
      const sdk = new Player({
        name: "Web Playback SDK",
        volume: 1.0,
        getOAuthToken: (callback) => {
          callback("access token");
        },
      });
      let connected = await sdk.connect();
      if (connected) {
        console.log("connected");
      }
    })();
  });

  useEffect(() => {});

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
          <div className="main__comingsoon"></div>
        </div>
      </div>
    </div>
  );
}
