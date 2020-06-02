import React, { useContext, useEffect } from "react";
import { CurrentPlayListContext, DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Song from "../Song/Song";
import "./TopTracksStyles.scss";

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

function TopTracks() {
  const { accessToken } = useContext(DataContext);
  const { currentPlayListId, currentPlayList, setCurrentPlayList } = useContext(
    CurrentPlayListContext
  );
  const url = `https://api.spotify.com/v1/playlists/${currentPlayListId}/tracks`;
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [{ data }] = useFetchData("", url, headers);

  useEffect(() => {
    try {
      const trackList = data.items.map((item) => {
        const { album, id, name, artists, duration_ms, explicit } = item.track;
        const { images } = album;
        return {
          id,
          name: name,
          image: images[images.length - 1].url,
          artist: artists.map((artist) => artist.name).join(", "),
          duration: millisToMinutesAndSeconds(duration_ms),
          explicit,
        };
      });
      setCurrentPlayList(trackList);
    } catch (err) {}
  }, [data, setCurrentPlayList]);

  let songList;
  if (currentPlayList) {
    songList = currentPlayList.map((song) => <Song key={song.id} {...song} />);
  }
  return (
    <div className="toptracks__container">
      <div className="toptracks__header">
        <h2 className="toptracks__header__title">Most Popular</h2>
        <h4 className="toptracks__header__subtitle">
          {currentPlayList.length} songs on the list
        </h4>
      </div>
      <div className="toptracks__tracks">{songList}</div>
    </div>
  );
}

export default TopTracks;
