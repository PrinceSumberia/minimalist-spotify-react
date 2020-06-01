import React, { useContext, useEffect } from "react";
import { GLOBAL_TRACK_ID } from "../../constants/constants";
import { DataContext, CurrentPlayListContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";

function TopTracks() {
  const { accessToken } = useContext(DataContext);
  const { currentPlayList, setCurrentPlayList } = useContext(
    CurrentPlayListContext
  );
  const url = `https://api.spotify.com/v1/playlists/${GLOBAL_TRACK_ID}/tracks`;
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [{ data }] = useFetchData("", url, headers);

  useEffect(() => {
    try {
      const trackList = data.items.map((track) => {
        return track.track.id;
      });
      setCurrentPlayList(trackList);
    } catch (err) {}
  }, [data, setCurrentPlayList]);

  console.log(currentPlayList);

  return (
    <div>
      <div className="">Hello</div>
    </div>
  );
}

export default TopTracks;
