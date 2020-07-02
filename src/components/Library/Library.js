import React, { useContext } from "react";
import useFetchData from "../../hooks/useFetchData";
import { DataContext } from "../../context/DataContext";
import { ArrowLeft } from "react-feather";
import { millisToMinutesAndSeconds } from "../../utils/helpers";
import Song from "../Song/Song";

function Library() {
  const { accessToken } = useContext(DataContext);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [data] = useFetchData(
    "",
    "https://api.spotify.com/v1/me/tracks",
    headers
  );

  let list, songList;

  try {
    list = data.data.items.map((item) => {
      const { id, name, artists, duration_ms, explicit, uri } = item.track;
      const images = item.track.album.images;
      const index = name.search(/\(/);
      return {
        id,
        name: (index !== -1 ? name.slice(0, index) : name).trim().toLowerCase(),
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
    songList = list.map((song) => <Song key={song.id} {...song} />);
    // console.log(list);
  } catch (err) {}
  // handleLike = { handleLike };

  return (
    <div className="library">
      <div className="library__header">
        <h2 className="library__title">Library</h2>
      </div>
      <div className="library__song">{songList}</div>
    </div>
  );
}

export default Library;
