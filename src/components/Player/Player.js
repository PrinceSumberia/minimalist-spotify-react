import classNames from "classnames";
import React, { useContext, useState, useRef } from "react";
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "react-feather";
import { CurrentSongContext, DataContext } from "../../context/DataContext";
import "./PlayerStyles.scss";
const { sdkPlayer } = useContext(DataContext);

function Player() {
  const { currentSong } = useContext(CurrentSongContext);
  const { isPlaying, setIsPlaying } = useContext(DataContext);
  const { name, artist, duration, image, duration_ms } = currentSong;
  const startTime = "0:00";
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  let rangeRef = useRef(null);

  const handleChange = (e) => {
    rangeRef.current.max = duration_ms;
    console.log(e.target.max);
    console.log(rangeRef.current.value);

    setInterval(() => {
      sdkPlayer.getCurrentState().then((state) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }

        let { position } = state;

        console.log("Currently Playing", position);
      });
    }, 1000);

    const percentage =
      (100 * (rangeRef.current.value - rangeRef.current.min)) /
      (rangeRef.current.max - rangeRef.current.min);
    console.log(percentage);
    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${
      settings.background
    } ${percentage + 0.1}%)`;
    rangeRef.current.style.background = bg;
  };

  const settings = {
    fill: "red",
    background: " #faf7f5",
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
      <input
        type="range"
        ref={rangeRef}
        className="player__progress"
        defaultValue={0}
        onChange={handleChange}
      />
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
