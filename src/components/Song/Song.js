import React, { memo } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Song.scss";

function Song({
  id,
  name,
  image,
  artist,
  duration,
  isLiked,
  handleLike,
  playSong,
  uri,
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    handleLike(id);
  };
  const handlePlay = () => {
    playSong(uri);
    console.log("Clicked");
  };
  return (
    <div className="song" onClick={handlePlay}>
      <div className="song__details">
        <div className="song__imgCont">
          <img src={image} alt="" className="song__imgCont__img" />
        </div>
        <h4 className="song__name">{name}</h4>
      </div>
      <div className="song__meta-content">
        <h4 className="song__artist">{artist}</h4>
        <div className="song__info">
          <div className="song__duration">{duration}</div>
          <div className={`song__fav ${isLiked && `song__fav--filled`}`}>
            <FontAwesomeIcon icon={faHeart} onClick={handleClick} />
            <FontAwesomeIcon icon={faHeart} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Song);
