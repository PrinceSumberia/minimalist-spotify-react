import classNames from "classnames";
import React, { useState } from "react";
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "react-feather";
import "./PlayerStyles.scss";

function Player() {
  const src = `https://i.scdn.co/image/ab67616d00001e0220e08c8cc23f404d723b5647`;
  const title = "The National Anthem";
  const startTime = "0:00";
  const endTime = "5:00";
  const [isPlaying, toogleIsPlaying] = useState(false);

  return (
    <div className="player">
      <div className="player__image__container">
        <img className="player__image__container__img" src={src} alt={title} />
      </div>
      <div className="player__details">
        <h3 className="player__title">{title}</h3>
        <p className="player__subtitle">{title}</p>
      </div>
      <div className="player__time">
        <p>{startTime}</p>
        <p>{endTime}</p>
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
