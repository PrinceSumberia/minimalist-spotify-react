import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import Song from "../Song/Song";
import "./LibraryStyles.scss";

function Library() {
  const { accessToken } = useContext(DataContext);
  const [songList, setSongList] = useState([]);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [{ data }] = useFetchData(
    "",
    "https://api.spotify.com/v1/me/tracks",
    headers
  );

  useEffect(() => {
    try {
      let dataList = data.items.map((item) => {
        const { id, name, artists, duration_ms, explicit, uri } = item.track;
        const images = item.track.album.images;
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
          isLiked: true,
          uri,
        };
      });
      setSongList(dataList);
    } catch (err) {}
  }, [data]);

  const handleLike = (id) => {
    const removeFav = async () => {
      const response = await Axios.delete(
        "https://api.spotify.com/v1/me/tracks",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            ids: [id],
          },
        }
      );
      if (response.status === 200) {
        console.log("Song Removed From Favorites");
      }
    };

    let updatedSongList = songList.map((song) => {
      if (song.id === id) {
        const updatedSong = { ...song, isLiked: !song.isLiked };
        return updatedSong;
      }
      return song;
    });
    setSongList(updatedSongList);

    let removedSong = updatedSongList.filter((song) => song.id !== id);
    setTimeout(() => {
      removeFav();
      setSongList(removedSong);
    }, 1000);
  };

  let list = songList.map((song) => (
    <Song key={song.id} {...song} handleLike={handleLike} />
  ));

  return (
    <div className="library">
      <div className="library__header">
        <h2 className="library__title">Library</h2>
      </div>
      <div className="library__song">{list}</div>
    </div>
  );
}

export default Library;
