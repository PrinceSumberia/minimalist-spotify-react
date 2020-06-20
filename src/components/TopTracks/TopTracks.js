import axios from "axios";
import React, { memo, useContext, useEffect } from "react";
import {
  CurrentPlayListContext,
  CurrentSongContext,
  DataContext,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import Song from "../Song/Song";
import "./TopTracksStyles.scss";

function TopTracks() {
  const {
    accessToken,
    deviceID,
    isPlaying,
    setIsPlaying,
    sdkPlayer,
  } = useContext(DataContext);
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
        setCurrentSong(albumData[0]);
      } catch (err) {
        console.log(err);
      }
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
        setCurrentSong(trackList[0]);
      } catch (err) {}
    }
  }, [
    data,
    setCurrentPlayList,
    setCurrentSong,
    currentPlayListType,
    currentPlayListId,
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

  const playViasdk = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken, id },
    },
  }) => {
    getOAuthToken((accessToken) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
  };

  const updateProgressBar = () => {
    // progressBar.max = song.duration;
    // progressBar.value = song.currentTime;
    // let width = (progressBar.value / progressBar.max) * 100;
    // range.style.width = `${width}%`;
  };

  if (deviceID) {
    if (isPlaying) {
      playViasdk({
        playerInstance: sdkPlayer,
        spotify_uri: currentSong.uri,
      });

      console.log(currentSong);
      setInterval(() => {
        sdkPlayer.getCurrentState().then((state) => {
          if (!state) {
            console.error(
              "User is not playing music through the Web Playback SDK"
            );
            return;
          }

          let { position } = state;

          console.log("Currently Playing", position);
        });
      }, 1000);
    } else {
      sdkPlayer.pause().then(() => {
        console.log("Paused!");
      });
      clearInterval();
    }
  }

  if (currentPlayList) {
    songList = currentPlayList.map((song) => (
      <Song key={song.id} {...song} handleLike={handleLike} />
    ));
  }

  return (
    <div className="toptracks__container">
      <div className="toptracks__header">
        <h2 className="toptracks__header__title">{currentPlayListType.name}</h2>
        <h4 className="toptracks__header__subtitle">
          {currentPlayList.length} songs on the list
        </h4>
      </div>
      <div className="toptracks__tracks">{songList}</div>
    </div>
  );
}

export default memo(TopTracks);
