import classNames from "classnames";
import React, { useContext, useState } from "react";
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "react-feather";
import { CurrentSongContext, DataContext } from "../../context/DataContext";
import "./PlayerStyles.scss";

function Player() {
  const { currentSong } = useContext(CurrentSongContext);
  const { accessToken, deviceID, isPlaying, setIsPlaying } = useContext(
    DataContext
  );
  const { name, artist, duration, image } = currentSong;
  const startTime = "0:00";
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
          onClick={handlePlayPause}
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
