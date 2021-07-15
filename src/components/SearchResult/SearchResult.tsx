import * as React from 'react';

import { ChevronRight, ChevronLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';

import { SEARCH_URL } from '../../constants';
import { useClient, useAsync } from '../../hooks';
import { millisToMinutesAndSeconds, scroll } from '../../utils/helpers';
import Card from '../Card';
import Loader from '../Loader';
import { SongListItem } from '../SongList';

import './SearchResultStyles.scss';

interface AsyncData {
  albums: {
    items: Array<{
      name: string;
      uri: string;
      id: string;
      images: Array<{ url: string }>;
    }>;
  };
  tracks: {
    items: Array<{
      id: string;
      name: string;
      uri: string;
      duration_ms: number;
      explicit: boolean;
      artists: Array<{ name: string }>;
      album: {
        images: Array<{ url: string }>;
      };
    }>;
  };
}

function SearchResult({ query }: { query: string }) {
  const client = useClient();
  const scroller = React.useRef<any>(null);
  const history = useHistory();
  const URL = `${SEARCH_URL}?q=${query}&type=album,track`;
  const { data, status, run } = useAsync<AsyncData>();

  React.useEffect(() => {
    run(client(URL));
  }, [URL]);

  const getID = (currentPlayList: { id: string; type: string }) => {
    history.push('/', { currentPlayList });
  };

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    scroll((e.target as HTMLDivElement).id, scroller);
  };

  return status === 'resolved' ? (
    <div className="result">
      <div className="result__albums">
        <div className="result__albums__container">
          <h2 className="result__header">Albums</h2>
          <div
            className="scrollers"
            onClick={handleScroll}
            onKeyPress={handleScroll}
            role="button"
            tabIndex={0}
          >
            <ChevronLeft className="icons" id="scrollLeft" />
            <ChevronRight className="icons" id="scrollRight" />
          </div>
        </div>
        <div className="result__albums__list" ref={scroller}>
          {data?.albums.items
            .map((item) => {
              const index = item.name.search(/\(/);
              return {
                name: (index !== -1 ? item.name.slice(0, index) : item.name)
                  .trim()
                  .toLowerCase(),
                uri: item.uri,
                id: item.id,
                thumbnail: item.images[0],
                image: item.images[1],
              };
            })
            .map(({ name, id, image }) => (
              <Card
                key={id}
                name={name}
                id={id}
                img={image.url}
                type="albums"
                handleClick={getID}
              />
            ))}
        </div>
      </div>
      <div className="result__songlist">
        <h2 className="result__header">Tracks</h2>
        <div className="result__songlist__list">
          {data?.tracks.items
            .map((item) => {
              const {
                id,
                name,
                artists,
                duration_ms: durationMs,
                explicit,
                uri,
              } = item;
              const { images } = item.album;
              const index = name.search(/\(/);
              return {
                id,
                name: (index !== -1 ? name.slice(0, index) : name)
                  .trim()
                  .toLowerCase(),
                thumbnail: images[images.length - 1].url,
                image: images[1].url,
                artist: artists
                  .map((artist) => artist.name)
                  .join(', ')
                  .toLowerCase(),
                duration: millisToMinutesAndSeconds(durationMs),
                durationMs,
                explicit,
                isLiked: false,
                uri,
              };
            })
            .map((song) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <SongListItem key={song.id} {...song} view="minimal" />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default SearchResult;
