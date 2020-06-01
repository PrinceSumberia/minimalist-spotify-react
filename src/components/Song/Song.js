import React from "react";
import "./Song.scss";

function Song({ id, name, image, artist, duration }) {
  return (
    <div className="song">
      <img src={image} alt="" className="song__img" />
      <h4>{name}</h4>
      <p>{artist}</p>
      <p>{duration}</p>
    </div>
  );
}

export default Song;
