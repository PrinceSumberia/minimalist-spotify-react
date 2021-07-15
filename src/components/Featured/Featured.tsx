import * as React from 'react';

import { useHistory } from 'react-router-dom';

import { FEATURED_PLAYLIST_URL } from '../../constants';
import { useClient, useAsync } from '../../hooks';
import Card from '../Card';
import Loader from '../Loader';

import './FeaturedStyles.scss';

interface AsyncData {
  playlists: {
    items: Array<{
      id: string;
      name: string;
      images: Array<{ url: string }>;
      tracks: { total: number };
    }>;
  };
}

function Featured() {
  const client = useClient();
  const history = useHistory();
  const { data, status, run } = useAsync<AsyncData>();

  React.useEffect(() => {
    run(client(FEATURED_PLAYLIST_URL));
  }, []);

  const getID = (currentPlayList: { id: string; type: string }): void => {
    history.push('/', { currentPlayList });
  };

  return status === 'resolved' ? (
    <div className="featured__container">
      {data?.playlists.items.map((list) => (
        <div className="featured__item" key={list.id}>
          <Card
            id={list.id}
            title={list.name}
            name={list.name}
            img={list.images[0].url}
            type="playlists"
            subtitle={`Total Tracks: ${list.tracks.total}`}
            handleClick={getID}
          />
        </div>
      ))}
    </div>
  ) : (
    <Loader />
  );
}

export default Featured;
