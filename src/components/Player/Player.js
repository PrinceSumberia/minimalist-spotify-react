import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "react-feather";
import { CurrentSongContext, DataContext } from "../../context/DataContext";
import "./PlayerStyles.scss";

function Player() {
  const { currentSong } = useContext(CurrentSongContext);
  const { uri, name, artist, duration, image } = currentSong;
  const startTime = "0:00";
  const [isPlaying, toogleIsPlaying] = useState(false);
  const { accessToken } = useContext(DataContext);

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
  });

  return (
    <div className="player">
      <div className="player__image__container">
        <img className="player__image__container__img" src={image} alt={name} />
      </div>
      <div className="player__details">
        <h3 className="player__title">{name}</h3>
        <p className="player__subtitle">{artist}</p>
      </div>
      <div className="player__time">
        <p>{startTime}</p>
        <p>{duration}</p>
      </div>
      <input type="range" className="player__progress" defaultValue="100" />
      <div className="player__control">
        <SkipBack className="player__icon" />
        <div
          className={classNames("player__control__play", {
            player__animate: isPlaying,
          })}
          onClick={() => toogleIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <PauseCircle className="player__icon player__icon__play" />
          ) : (
            <PlayCircle className="player__icon player__icon__pause" />
          )}
        </div>
        <SkipForward className="player__icon" />
      </div>
    </div>
  );
}

export default Player;
