import React, { useContext, useEffect } from "react";
import {
  CurrentPlayListProvider,
  CurrentSongProvider,
  DataContext,
  NewAlbumProvider,
  TopPlayListProvider,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import NewAlbums from "../NewAlbums/NewAlbums";
import Player from "../Player/Player";
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
    setDeviceID,
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
      var player = new window.Spotify.Player({
        name: "A Spotify Web SDK Player",
        getOAuthToken: (callback) => {
          callback(accessToken);
        },
        volume: 0.1,
      });

      // Called when connected to the player created beforehand successfully
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceID(device_id);

        const play = ({
          spotify_uri,
          playerInstance: {
            _options: { getOAuthToken, id },
          },
        }) => {
          getOAuthToken((accessToken) => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
              method: "PUT",
              body: JSON.stringify({ uris: [spotify_uri] }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });
          });
        };

        play({
          playerInstance: player,
          spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
        });
      });

      // Connect to the player created beforehand, this is equivalent to
      // creating a new device which will be visible for Spotify Connect
      player.connect();
    };
  }, [accessToken, setDeviceID]);

  useEffect(() => {
    if (data.success) {
      setProfileData(data);
    } else if (data.status === 401) {
      setIsAuthenticated(false);
      setAccessToken(null);
    }
  }, [data, setProfileData, setAccessToken, setIsAuthenticated, accessToken]);

  return (
    <CurrentPlayListProvider>
      <CurrentSongProvider>
        <div className="container">
          <div className="sidebar">
            <Profile />
            <Navbar />
            <div className="sidebar__player">
              <Player />
            </div>
          </div>
          <div className="mainContent">
            <TopPlayListProvider>
              <TopChart />
            </TopPlayListProvider>
            <div className="main__content">
              <div className="main__toptracks">
                <TopTracks />
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
      </CurrentSongProvider>
    </CurrentPlayListProvider>
  );
}
