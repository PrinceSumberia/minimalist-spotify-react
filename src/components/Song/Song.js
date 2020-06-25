import { faFlask, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CurrentSongContext, DataContext } from "../../context/DataContext";
import "./Song.scss";
import classNames from "classnames";

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
}) {
  const { setCurrentSong } = useContext(CurrentSongContext);
  const { setIsPlaying } = useContext(DataContext);
  let history = useHistory();

  const handleClick = (e) => {
    e.stopPropagation();
    handleLike(id);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    setCurrentSong({ uri, name, artist, duration, image, id, duration_ms });
    setIsPlaying(true);
  };

  const handleAnalyse = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `dashboard/tracks/${id}`,
      state: { name, image, duration, artist, explicit },
    });
  };

  return (
    <div className="song" onClick={handlePlay}>
      <div className="song__imgCont">
        <img src={thumbnail} alt="" className="song__imgCont__img" />
      </div>
      <div className="song__name">{name}</div>
      <div className="song__artist">{artist}</div>
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
    </div>
  );
}

export default memo(Song);
