import React, { memo, useContext, useEffect } from "react";
import {
  CurrentPlayListContext,
  DataContext,
  CurrentSongContext,
  CurrentSongProvider,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Song from "../Song/Song";
import "./TopTracksStyles.scss";

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

function TopTracks() {
  const { accessToken, deviceID } = useContext(DataContext);
  const {
    currentPlayListId,
    currentPlayList,
    setCurrentPlayList,
    currentPlayListType,
  } = useContext(CurrentPlayListContext);
  const { setCurrentSong } = useContext(CurrentSongContext);
  let url;
  if (currentPlayListType === "albums") {
    url = `https://api.spotify.com/v1/${currentPlayListType}/${currentPlayListId}`;
  } else {
    url = `https://api.spotify.com/v1/${currentPlayListType}/${currentPlayListId}/tracks`;
  }
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [{ data }] = useFetchData("", url, headers);
  let songList;

  useEffect(() => {
    try {
      const trackList = data.items.flatMap((item) => {
        if (item.track) {
          const { id, name, artists, duration_ms, explicit, uri } = item.track;
          const images = item.track.album.images;
          const index = name.search(/\(/);
          return {
            id,
            name: (index !== -1 ? name.slice(0, index) : name)
              .trim()
              .toLowerCase(),
            thumbnail:
              currentPlayListType === "albums"
                ? "url"
                : images[images.length - 1].url,
            image: images[1].url,
            artist: artists
              .map((artist) => artist.name)
              .join(", ")
              .toLowerCase(),
            duration: millisToMinutesAndSeconds(duration_ms),
            explicit,
            isLiked: false,
            uri,
          };
        }
        return [];
      });
      setCurrentPlayList(trackList);
      console.log("tracklist", trackList);
      setCurrentSong(trackList[0]);
    } catch (err) {
      console.log(err);
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

  const playSong = (song) => {
    setCurrentSong(song);
    // console.log("Playing");
    // const play = ({
    //   spotify_uri,
    //   playerInstance: {
    //     _options: { getOAuthToken, id },
    //   },
    // }) => {
    //   getOAuthToken((access_token) => {
    //     console.log("this is ghetting executed");
    //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //       method: "PUT",
    //       body: JSON.stringify({ uris: [spotify_uri] }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     });
    //   });
    // };
    // play({
    //   playerInstance: new window.Spotify.Player({
    //     name: "Web Playback SDK Quick Start Player",
    //     getOAuthToken: () => {
    //       return accessToken;
    //     },
    //     deviceID,
    //   }),
    //   spotify_uri: uri,
    // });
  };

  if (currentPlayList) {
    songList = currentPlayList.map((song) => (
      <Song
        key={song.id}
        {...song}
        handleLike={handleLike}
        playSong={playSong}
      />
    ));
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

export default memo(TopTracks);
