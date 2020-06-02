import React from "react";
import "./Song.scss";
import { Heart } from "react-feather";

function Song({ id, name, image, artist, duration }) {
  return (
    <div className="song">
      <div className="song__details">
        <img src={image} alt="" className="song__img" />
        <h4 className="song__name">{name}</h4>
      </div>
      <div className="song__meta-content">
        <div className="song__artist">
          <h4>{artist}</h4>
        </div>
        <div className="song__info">
          <div className="song__duration">{duration}</div>
          <div className="song__fav">
            <Heart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
