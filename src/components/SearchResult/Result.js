import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import Song from "../Song/Song";
import "./ResultStyles.scss";

function Result({ query }) {
  const { accessToken } = useContext(DataContext);
  const [result, setResult] = useState([]);

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const url = `https://api.spotify.com/v1/search?q=name:${query}&type=album,track`;

  const [data] = useFetchData("", url, headers);

  const handleLike = () => {
    // console.log("Like");
  };

  useEffect(() => {
    try {
      let dataList = data.data.tracks.items.map((item) => {
        const { id, name, artists, duration_ms, explicit, uri } = item;
        const images = item.album.images;
        const index = name.search(/\(/);
        return {
          id,
          name: (index !== -1 ? name.slice(0, index) : name)
            .trim()
            .toLowerCase(),
          thumbnail: images[images.length - 1].url,
          image: images[1].url,
          artist: artists
            .map((artist) => artist.name)
            .join(", ")
            .toLowerCase(),
          duration: millisToMinutesAndSeconds(duration_ms),
          duration_ms,
          explicit,
          isLiked: false,
          uri,
        };
      });
      setResult(dataList);
    } catch (err) {}
  }, [data]);

  let songList = result.map((song) => (
    <Song key={song.id} {...song} handleLike={handleLike} view="minimal" />
  ));

  return (
    <div className="result">
      <div className="result__songlist__container">
        <h2 className="result__header">Tracks</h2>
        <div className="result__songlist__songs">{songList}</div>
      </div>
    </div>
  );
}

export default Result;
