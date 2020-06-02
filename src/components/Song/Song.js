import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Song.scss";

function Song({ id, name, image, artist, duration }) {
  const [toogleLike, setToogleLike] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setToogleLike(!toogleLike);
    console.log("Fav Clicked");
  };
  const handlePlay = () => {
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
          <div className={`song__fav ${toogleLike && `song__fav--filled`}`}>
            <FontAwesomeIcon icon={faHeart} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
