import classNames from "classnames";
import React, { useContext, useRef, useState, memo } from "react";
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "react-feather";
import {
  CurrentSongContext,
  DataContext,
  CurrentPlayListContext,
} from "../../context/DataContext";
import useInterval from "../../hooks/useInterval";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import "./PlayerStyles.scss";

const Player = () => {
  const { sdkPlayer, isPlaying, setIsPlaying } = useContext(DataContext);
  const { currentPlayList } = useContext(CurrentPlayListContext);
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
  const { name, artist, duration, image, duration_ms } = currentSong;
  const [currentPosition, setCurrentPosition] = useState("0.00");
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  let rangeRef = useRef(null);

  const playNextSong = () => {
    const currentSongIndex = currentPlayList.findIndex(
      (item) => item.id === currentSong.id
    );
    let nextSongIndex =
      currentSongIndex === currentPlayList.length - 1
        ? 0
        : currentSongIndex + 1;
    setCurrentSong(currentPlayList[nextSongIndex]);
  };

  useInterval(
    () => {
      rangeRef.current.max = duration_ms;
      sdkPlayer.getCurrentState().then((state) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }
        let { position } = state;
        rangeRef.current.value = position;
        console.log(position);
      });

      setCurrentPosition(millisToMinutesAndSeconds(rangeRef.current.value));

      let percentage =
        (100 * (rangeRef.current.value - rangeRef.current.min)) /
        (rangeRef.current.max - rangeRef.current.min);
      let bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${
        settings.background
      } ${percentage + 0.1}%)`;
      rangeRef.current.style.background = bg;

      if (Math.round(percentage) === 100) {
        playNextSong();
      }
    },
    isPlaying ? 1000 : null
  );

  const settings = {
    fill: "red",
    background: " #faf7f5",
  };

  const handleChange = (e) => {
    sdkPlayer.seek(rangeRef.current.value).then(() => {});
  };

  const handleNext = () => {
    playNextSong();
  };

  const handlePrev = () => {
    const currentSongIndex = currentPlayList.findIndex(
      (item) => item.id === currentSong.id
    );

    if (!(currentSongIndex === 0)) {
      let prevSongIndex = currentSongIndex - 1;
      setCurrentSong(currentPlayList[prevSongIndex]);
    }
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
        <p>{currentPosition}</p>
        <p>{duration}</p>
      </div>
      <input
        type="range"
        ref={rangeRef}
        className="player__progress"
        defaultValue={0}
        min={0}
        max={duration_ms}
        onChange={handleChange}
      />
      <div className="player__control">
        <SkipBack className="player__icon" onClick={handlePrev} />
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
        <SkipForward className="player__icon" onClick={handleNext} />
      </div>
    </div>
  );
};

export default memo(Player);
