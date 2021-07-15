import * as React from 'react';

import { useLocation, useParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import Loader from '../../components/Loader';
import { ANALYSIS_URL, FEATURES_URL } from '../../constants';
import { useCurrentSongUpdater } from '../../context/CurrentSongContext';
import { useAsync, useClient } from '../../hooks';

import './TrackAnalysis.scss';

function AudioFeature({ URL }: { URL: string }) {
  const client = useClient();
  const { status, run, data } = useAsync();

  React.useEffect(() => {
    run(client(URL));
  }, [URL]);

  return status === 'resolved' ? (
    <ResponsiveContainer>
      <BarChart
        width={800}
        height={600}
        data={[data]}
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
    </ResponsiveContainer>
  ) : (
    <Loader />
  );
}

function AudioAnalysis({
  URL,
  explicit,
  duration,
}: {
  URL: string;
  explicit: boolean;
  duration: string;
}) {
  const client = useClient();
  const { status, run, data } = useAsync<{
    bars: [];
    beats: [];
    sections: [];
    segments: [];
    tatums: [];
    track: Record<string, any>;
  }>();

  React.useEffect(() => {
    run(client(URL));
  }, [URL]);

  return status === 'resolved' ? (
    <>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">{duration}</div>
        <div className="trackAnalysis__analysis__title">Duration</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {explicit ? 'Yes' : 'No'}
        </div>
        <div className="trackAnalysis__analysis__title">Explicit</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {data!.bars.length}
        </div>
        <div className="trackAnalysis__analysis__title">Bars</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {data!.beats.length}
        </div>
        <div className="trackAnalysis__analysis__title">Beats</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {data!.track.tempo}
        </div>
        <div className="trackAnalysis__analysis__title">Tempo</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {data!.sections.length}
        </div>
        <div className="trackAnalysis__analysis__title">Sections</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {data!.segments.length}
        </div>
        <div className="trackAnalysis__analysis__title">Segments</div>
      </div>
      <div className="trackAnalysis__analysis__feature">
        <div className="trackAnalysis__analysis__value">
          {data!.tatums.length}
        </div>
        <div className="trackAnalysis__analysis__title">Tatums</div>
      </div>
    </>
  ) : (
    <Loader />
  );
}

interface LocationData {
  uri: string;
  name: string;
  artist: string;
  duration: string;
  image: string;
  durationMs: number;
  explicit: boolean;
}

function TrackAnalysis() {
  const { id } = useParams<{ id: string }>();
  const {
    state: { uri, name, artist, duration, image, durationMs, explicit },
  } = useLocation<LocationData>();
  const { setCurrentSong } = useCurrentSongUpdater();

  const audioFeatureURL = `${FEATURES_URL}${id}`;
  const audioAnalysisURL = `${ANALYSIS_URL}${id}`;

  const handlePlay = () => {
    setCurrentSong({ uri, name, artist, duration, image, id, durationMs });
  };

  return (
    <div className="trackAnalysis">
      <div className="trackAnalysis__header">
        <div className="trackAnalysis__header__media">
          <img
            src={image}
            alt={name}
            className="trackAnalysis__header__media__img"
          />
        </div>
        <div className="trackAnalysis__header__meta">
          <p className="trackAnalysis__header__title">{name}</p>
          <p className="trackAnalysis__header__subtitle">{artist}</p>
          <button
            className="trackAnalysis__btn"
            onClick={handlePlay}
            type="button"
          >
            Play Song
          </button>
        </div>
      </div>
      <div className="trackAnalysis__analysis">
        <AudioAnalysis
          URL={audioAnalysisURL}
          duration={duration}
          explicit={explicit}
        />
      </div>
      <h2>Audio Features</h2>
      <div className="trackAnalysis__chart">
        <AudioFeature URL={audioFeatureURL} />
      </div>
    </div>
  );
}

export default TrackAnalysis;
