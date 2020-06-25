import { faFlask, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CurrentSongContext, DataContext } from "../../context/DataContext";
import "./Song.scss";

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

  const handleAnalyse = () => {
    history.push({
      pathname: `dashboard/tracks/${id}`,
      state: { name, image, duration, artist, explicit },
    });
  };

  return (
    <div className="song" onClick={handlePlay}>
      <div className="song__details">
        <div className="song__imgCont">
          <img src={thumbnail} alt="" className="song__imgCont__img" />
        </div>
        <h4 className="song__name">{name}</h4>
      </div>
      <div className="song__meta-content">
        <h4 className="song__artist">{artist}</h4>
        <div className="song__info">
          <div className="song__duration">{duration}</div>
          <div className="song__analyse">
            <FontAwesomeIcon icon={faFlask} onClick={handleAnalyse} />
          </div>
          <div className={`song__fav ${isLiked && `song__fav--filled`}`}>
            <FontAwesomeIcon icon={faHeart} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Song);
