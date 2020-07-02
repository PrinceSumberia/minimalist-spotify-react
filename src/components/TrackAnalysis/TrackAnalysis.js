import React, { memo, useContext, useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ANALYSIS_URL, FEATURES_URL } from "../../constants/constants";
import { CurrentSongContext, DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../Loader/Loader";
import "./TrackAnalysisStyles.scss";

function TrackAnalysis({ match, location }) {
  const {
    accessToken,
    setIsPlaying,
    sdkPlayer,
    setIsAuthenticated,
    setAccessToken,
  } = useContext(DataContext);
  const { setCurrentSong } = useContext(CurrentSongContext);
  const [analysis, setAnalysis] = useState({});
  const [features, setFeatures] = useState([]);

  const audioFeatureURL = `${FEATURES_URL}${match.params.id}`;
  const audioAnalysisURL = `${ANALYSIS_URL}${match.params.id}`;

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const {
    uri,
    name,
    artist,
    duration,
    image,
    id,
    duration_ms,
    explicit,
  } = location.state;

  const [loading, setLoading] = useState(true);

  const [data] = useFetchData("", audioFeatureURL, headers);
  const [dataAnalysis] = useFetchData("", audioAnalysisURL, headers);

  if (data.status === 401) {
    window.localStorage.removeItem("accessToken");
    sdkPlayer.disconnect();
    setIsAuthenticated(false);
    setAccessToken(null);
  }

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

  const handlePlay = (e) => {
    e.preventDefault();
    setCurrentSong({ uri, name, artist, duration, image, id, duration_ms });
    setIsPlaying(true);
  };

  return loading ? (
    <Loader />
  ) : (
    <FadeIn>
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
            <button className="trackAnalysis__btn" onClick={handlePlay}>
              Play Song
            </button>
          </div>
        </div>
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
    </FadeIn>
  );
}

export default memo(TrackAnalysis);
