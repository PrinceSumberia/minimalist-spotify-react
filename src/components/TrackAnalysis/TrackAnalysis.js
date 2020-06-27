import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import "./TrackAnalysisStyles.scss";
import { memo } from "react";
import Placeholder from "../Placeholder/Placeholder";

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
  const [loading, setLoading] = useState(true);

  const [data] = useFetchData("", url, headers);
  const [dataAnalysis] = useFetchData("", url2, headers);

  useEffect(() => {
    if (data.success && dataAnalysis.success) {
      setLoading(false);
    }
  }, [data, dataAnalysis]);

  useEffect(() => {
    if (dataAnalysis.success) {
      setAnalysis(dataAnalysis.data);
    }
    if (data.success) {
      setFeatures([data.data]);
    }
  }, [data, dataAnalysis]);

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
        <div className="trackAnalysis__header__media">
          <img
            src={image}
            alt=""
            className="trackAnalysis__header__media__img"
          />
        </div>
        <div className="trackAnalysis__header__meta">
          <p className="trackAnalysis__header__title">{name}</p>
          <p className="trackAnalysis__header__subtitle">{artist}</p>
          <button className="trackAnalysis__btn">Play Song</button>
        </div>
      </div>
      {loading ? (
        <Placeholder />
      ) : (
        <div className="trackAnalysis__analysis">
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{duration}</div>
            <div className="trackAnalysis__analysis__title">Duration</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">
              {explicit ? "Yes" : "No"}
            </div>
            <div className="trackAnalysis__analysis__title">Explicit</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{bars}</div>
            <div className="trackAnalysis__analysis__title">Bars</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{beats}</div>
            <div className="trackAnalysis__analysis__title">Beats</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{tempo}</div>
            <div className="trackAnalysis__analysis__title">Tempo</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{sections}</div>
            <div className="trackAnalysis__analysis__title">Sections</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{segments}</div>
            <div className="trackAnalysis__analysis__title">Segments</div>
          </div>
          <div className="trackAnalysis__analysis__feature">
            <div className="trackAnalysis__analysis__value">{tatums}</div>
            <div className="trackAnalysis__analysis__title">Tatums</div>
          </div>
        </div>
      )}
      <h2>Audio Features</h2>
      <div className="trackAnalysis__chart">
        <BarChart
          width={800}
          height={600}
          data={features}
          barSize={60}
          barGap={25}
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

export default memo(TrackAnalysis);

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
