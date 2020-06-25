import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import "./TrackAnalysisStyles.scss";
import { useEffect } from "react";
import { useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import { millisToMinutesAndSeconds } from "../../utils/helpers";

function TrackAnalysis({ match, location }) {
  const { accessToken } = useContext(DataContext);
  const [analysis, setAnalysis] = useState({});
  const [features, setFeatures] = useState([]);

  const url = `https://api.spotify.com/v1/audio-features/${match.params.id}`;
  const url2 = `https://api.spotify.com/v1/audio-analysis/${match.params.id}`;

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const { name, image, duration, artist, explicit } = location.state;
  console.log(explicit);

  const [data] = useFetchData("", url, headers);
  const [dataAnalysis] = useFetchData("", url2, headers);

  useEffect(() => {
    if (dataAnalysis.success) {
      setAnalysis(dataAnalysis.data);
    }
    if (data.success) {
      setFeatures([data.data]);
    }
  }, [data, dataAnalysis]);
  console.log(analysis);

  let beats, bars, tempo, sections, segments, tatums;
  try {
    beats = analysis.beats.length;
    bars = analysis.bars.length;
    sections = analysis.sections.length;
    segments = analysis.segments.length;
    tatums = analysis.tatums.length;
    tempo = Math.round(features[0].tempo);
  } catch {}

  return (
    <div className="trackAnalysis">
      <div className="trackAnalysis__header">
        <div className="header__img">
          <img src={image} alt="" />
        </div>
        <div className="header__title">{name}</div>
        <div className="header__subTitle">{artist}</div>
        <button className="btn">Play</button>
      </div>
      <div className="trackAnalysis__analysis">
        <div className="analysis__duration">
          <div className="analysis__value">{duration}</div>
          <div className="analysis__title">Duration</div>
        </div>
        <div className="analysis__explicit">
          <div className="analysis__value">{String(explicit)}</div>
          <div className="analysis__title">Explicit</div>
        </div>
        <div className="analysis__bars">
          <div className="analysis__value">{bars}</div>
          <div className="analysis__title">Bars</div>
        </div>
        <div className="analysis__beats">
          <div className="analysis__value">{beats}</div>
          <div className="analysis__title">Beats</div>
        </div>
        <div className="analysis__tempo">
          <div className="analysis__value">{tempo}</div>
          <div className="analysis__title">Tempo</div>
        </div>
        <div className="analysis__sections">
          <div className="analysis__value">{sections}</div>
          <div className="analysis__title">Sections</div>
        </div>
        <div className="analysis__segments">
          <div className="analysis__value">{segments}</div>
          <div className="analysis__title">Segments</div>
        </div>
        <div className="analysis__tatums">
          <div className="analysis__value">{tatums}</div>
          <div className="analysis__title">Tatums</div>
        </div>
      </div>
      <div className="trackAnalysis__chart">
        <BarChart
          width={800}
          height={400}
          data={features}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acousticness" fill="#003f5c" />
          <Bar dataKey="danceability" fill="#374c80" />
          <Bar dataKey="energy" fill="#7a5195" />
          <Bar dataKey="instrumentalness" fill="#bc5090" />
          <Bar dataKey="liveness" fill="#ef5675" />
          <Bar dataKey="speechiness" fill="#ff764a" />
          <Bar dataKey="valence" fill="#ffa600" />
        </BarChart>
      </div>
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
