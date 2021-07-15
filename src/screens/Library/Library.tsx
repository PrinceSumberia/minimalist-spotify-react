import * as React from 'react';

import Loader from '../../components/Loader';
import SongListItem from '../../components/SongList/SongListItem';
import { useClient, useAsync } from '../../hooks';
import { millisToMinutesAndSeconds } from '../../utils/helpers';

import './LibraryStyles.scss';

type SongList = {
  id: string;
  name: string;
  uri: string;
  image: string;
  duration: string;
  thumbnail: string;
  duration_ms: number;
  explicit: boolean;
  isLiked: boolean;
  artists: Array<{ name: string }>;
  album: { images: Array<Record<string, string>> };
};

interface AsyncData {
  items: Array<Record<string, SongList>>;
}

interface FormatSongList {
  id: string;
  name: string;
  thumbnail: string;
  image: string;
  artist: string;
  duration: string;
  durationMs: number;
  explicit: boolean;
  isLiked: boolean;
  uri: string;
}

type FormatReturnType = Array<FormatSongList>;

function formatData(data: AsyncData): FormatReturnType {
  const formattedData = data?.items.map((item) => {
    const {
      id,
      name,
      artists,
      duration_ms: durationMs,
      explicit,
      uri,
    } = item.track;
    const { images } = item.track.album;
    const index = name.search(/\(/);
    return {
      id,
      name: (index !== -1 ? name.slice(0, index) : name).trim().toLowerCase(),
      thumbnail: images[images.length - 1].url,
      image: images[1].url,
      artist: artists
        .map((artist) => artist.name)
        .join(', ')
        .toLowerCase(),
      duration: millisToMinutesAndSeconds(durationMs),
      durationMs,
      explicit,
      isLiked: true,
      uri,
    };
  });
  return formattedData;
}

const URL = 'https://api.spotify.com/v1/me/tracks';

function Library() {
  const client = useClient();
  const { run, status, data, setData } = useAsync<FormatReturnType>();

  React.useEffect(() => {
    run(client(URL).then((res) => formatData(res)));
  }, []);

  const toggleLike = (id: string) => {
    client(URL, {
      method: 'DELETE',
      data: { ids: [id] },
    })
      .then(() => {
        const updatedData = data?.filter((item) => item.id !== id);
        setData(updatedData as FormatReturnType);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="library">
      <div className="library__header">
        <h2 className="library__title">Library</h2>
      </div>
      <div className="library__song">
        {status === 'resolved' ? (
          data?.map((item) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <SongListItem key={item.id} {...item} handleLike={toggleLike} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Library;
