import React, { useContext } from "react";
import { GLOBAL_TRACK_ID } from "../../constants/constants";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";

function TopTracks() {
  const { accessToken } = useContext(DataContext);
  const url = `https://api.spotify.com/v1/playlists/${GLOBAL_TRACK_ID}/tracks`;
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [{ data }] = useFetchData("", url, headers);
  let trackList;
  try {
    trackList = data.items.map((track) => {
      return track.track.id;
    });
  } catch (err) {}

  return (
    <div>
      <pre>{JSON.stringify(trackList, null, 2)}</pre>
    </div>
  );
}

export default TopTracks;
