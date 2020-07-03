import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import Song from "../Song/Song";
import "./ResultStyles.scss";
import Cards from "../Cards/Cards";

function Result({ query }) {
  const { accessToken } = useContext(DataContext);
  const [result, setResult] = useState([]);
  const [albumList, setAblumList] = useState([]);

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const url = `https://api.spotify.com/v1/search?q=name:${query}&type=album,track`;

  const [data] = useFetchData("", url, headers);
  console.log(data);

  const handleLike = () => {
    // console.log("Like");
  };

  useEffect(() => {
    try {
      let albumList = data.data.albums.items.map((item) => {
        const index = item.name.search(/\(/);
        return {
          name: (index !== -1 ? item.name.slice(0, index) : item.name)
            .trim()
            .toLowerCase(),
          uri: item.uri,
          id: item.id,
          thumbnail: item.images[0],
          image: item.images[1],
        };
      });
      setAblumList(albumList);
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

  const getID = (id, name) => {
    console.log(id);
    // setCurrentPlayListType({ name: name, type: "albums" });
    // setCurrentPlayListId(id);
  };

  let albums = albumList.map(({ name, id, image }) => (
    <Cards name={name} id={id} img={image.url} handleClick={getID} />
  ));

  return (
    <div className="result">
      <div className="result__albums">
        <h2 className="result__header">Albums</h2>
        <div className="result__albums__list">{albums}</div>
      </div>
      <div className="result__songlist">
        <h2 className="result__header">Tracks</h2>
        <div className="result__songlist__list">{songList}</div>
      </div>
    </div>
  );
}

export default Result;
