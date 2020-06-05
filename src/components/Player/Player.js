import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

function Player() {
  const { deviceID } = useContext(DataContext);
  useEffect(() => {
    window.Spotify.Play();
  });
  const playSong = () => {};
  return (
    <div className="player">
      <button className="player__btn" onClick={playSong}>
        Play Song
      </button>
    </div>
  );
}

export default Player;
