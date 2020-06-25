import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";

function TrackAnalysis({ match }) {
  const { accessToken } = useContext(DataContext);

  const url = `https://api.spotify.com/v1/audio-features/${match.params.id}`;
  const url2 = `https://api.spotify.com/v1/audio-analysis/${match.params.id}`;

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", url, headers);
  // const [data2] = useFetchData("", url2, headers);
  console.log(data.data);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default TrackAnalysis;
