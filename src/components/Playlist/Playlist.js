import React, { memo, useContext, useEffect } from "react";
import {
  CurrentPlayListContext,
  CurrentSongContext,
  DataContext,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import Song from "../Song/Song";
import "./PlaylistStyles.scss";

function Playlist() {
  const { accessToken } = useContext(DataContext);
  const {
    currentPlayListId,
    currentPlayList,
    setCurrentPlayList,
    currentPlayListType,
  } = useContext(CurrentPlayListContext);
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
  let url;
  if (currentPlayListType.type === "albums") {
    url = `https://api.spotify.com/v1/${currentPlayListType.type}/${currentPlayListId}`;
  } else {
    url = `https://api.spotify.com/v1/${currentPlayListType.type}/${currentPlayListId}/tracks`;
  }
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [{ data }] = useFetchData("", url, headers);
  let songList;

  useEffect(() => {
    if (currentPlayListType.type === "albums") {
      try {
        const images = data.images;
        const albumData = data.tracks.items.flatMap((item) => {
          if (item) {
            const { id, name, artists, duration_ms, explicit, uri } = item;
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
          }
          return [];
        });
        setCurrentPlayList(albumData);
        !currentSong.uri && setCurrentSong(albumData[0]);
      } catch (err) {}
    } else {
      try {
        const trackList = data.items.flatMap((item) => {
          if (item.track) {
            const {
              id,
              name,
              artists,
              duration_ms,
              explicit,
              uri,
            } = item.track;
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
              isLiked: false,
              uri,
            };
          }
          return [];
        });
        setCurrentPlayList(trackList);
        !currentSong.uri && setCurrentSong(trackList[0]);
      } catch (err) {}
    }
  }, [
    data,
    setCurrentPlayList,
    currentPlayListType,
    currentPlayListId,
    currentSong.uri,
    setCurrentSong,
  ]);

  const handleLike = (id) => {
    let updatedSongList = currentPlayList.map((song) => {
      if (song.id === id) {
        const updatedSong = { ...song, isLiked: !song.isLiked };
        return updatedSong;
      }
      return song;
    });
    setCurrentPlayList(updatedSongList);
  };

  if (currentPlayList) {
    songList = currentPlayList.map((song) => (
      <Song key={song.id} {...song} handleLike={handleLike} />
    ));
  }

  return (
    <div className="playlist__container">
      <div className="playlist__header">
        <h2 className="playlist__header__title">{currentPlayListType.name}</h2>
        <h4 className="playlist__header__subtitle">
          {currentPlayList.length} songs on the list
        </h4>
      </div>
      <div className="playlist__tracks">{songList}</div>
    </div>
  );
}

export default memo(Playlist);