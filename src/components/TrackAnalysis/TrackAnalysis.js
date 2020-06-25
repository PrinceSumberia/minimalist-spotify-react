import React, { useContext, useState } from "react";
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

  if (data.success) {
    console.log(data.data);
  }

  // const [data2] = useFetchData("", url2, headers);
  // console.log(data);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default TrackAnalysis;

// acousticness: 0.247;
// analysis_url: "https://api.spotify.com/v1/audio-analysis/7ytR5pFWmSjzHJIeQkgog4";
// danceability: 0.746;
// duration_ms: 181733;
// energy: 0.69;
// id: "7ytR5pFWmSjzHJIeQkgog4";
// instrumentalness: 0;
// key: 11;
// liveness: 0.101;
// loudness: -7.956;
// mode: 1;
// speechiness: 0.164;
// tempo: 89.977;
// time_signature: 4;
// track_href: "https://api.spotify.com/v1/tracks/7ytR5pFWmSjzHJIeQkgog4";
// type: "audio_features";
// uri: "spotify:track:7ytR5pFWmSjzHJIeQkgog4";
// valence: 0.497;
