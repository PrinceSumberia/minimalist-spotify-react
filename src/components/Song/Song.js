import React, { memo, useContext } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { faFlask, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useViewport from "../../hooks/useViewport";
import { CurrentSongContext, DataContext } from "../../context/DataContext";

import "./SongStyles.scss";

function Song({
  id,
  name,
  image,
  artist,
  duration,
  duration_ms,
  isLiked,
  handleLike,
  playSong,
  explicit,
  uri,
  thumbnail,
  view,
}) {
  const { setCurrentSong } = useContext(CurrentSongContext);
  const { setIsPlaying } = useContext(DataContext);
  let history = useHistory();

  const handleClick = (e) => {
    e.stopPropagation();
    handleLike(id);
  };

  const { width } = useViewport();
  const breakpoint = 1100;

  const handlePlay = (e) => {
    if (width <= breakpoint) {
      toast.dark("Tracks can't be played on Mobile Devices");
      return;
    }
    e.stopPropagation();
    setCurrentSong({ uri, name, artist, duration, image, id, duration_ms });
    setIsPlaying(true);
  };

  const handleAnalyse = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/tracks/${id}`,
      state: { uri, name, artist, duration, image, id, duration_ms, explicit },
    });
  };

  return (
    <div className="song" onClick={handlePlay}>
      <div className="song__imgCont">
        <img src={thumbnail} alt="" className="song__imgCont__img" />
      </div>
      <div className="song__name">{name}</div>
      <div className="song__artist">{artist}</div>
      {view !== "minimal" && (
        <>
          <div className="song__meta">
            <div className="meta__duration">{duration}</div>
            <div className="meta__analyse">
              <FontAwesomeIcon icon={faFlask} onClick={handleAnalyse} />
            </div>
            <div
              className={classNames("meta__like", {
                "meta__like--filled": isLiked,
              })}
            >
              <FontAwesomeIcon icon={faHeart} onClick={handleClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Song);
