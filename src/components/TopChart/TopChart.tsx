import * as React from 'react';

import { ChevronLeft, ChevronRight, Loader } from 'react-feather';
import { useHistory } from 'react-router-dom';

import { TOP_PLAYLIST_URL } from '../../constants';
import { useClient, useAsync } from '../../hooks';
import { scroll } from '../../utils/helpers';
import { CurrentPlayListType } from '../../utils/types';
import Card from '../Card';
import Form from '../Form';

import './TopChartStyles.scss';

interface PropType {
  setCurrentPlayList: React.Dispatch<React.SetStateAction<CurrentPlayListType>>;
}

interface AsyncData {
  playlists: {
    items: Array<{
      id: string;
      name: string;
      type: string;
      images: Array<{ url: string }>;
      tracks: { total: number };
    }>;
  };
}

function TopChart({ setCurrentPlayList }: PropType) {
  const scroller = React.useRef<any>();
  const history = useHistory();
  const client = useClient();
  const { run, data, status, error } = useAsync<AsyncData>();

  if (status === 'rejected') {
    throw error as Error;
  }

  React.useEffect(() => {
    run(client(TOP_PLAYLIST_URL));
  }, [TOP_PLAYLIST_URL]);

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    scroll((e.target as HTMLDivElement).id, scroller);
  };

  const handleSearchQuery = (query: string) => {
    history.push('/search', { query });
  };

  return (
    <div className="topchart-container">
      <div className="topchart-header">
        <div
          role="button"
          className="scrollers"
          onClick={handleScroll}
          onKeyPress={handleScroll}
          tabIndex={0}
        >
          <ChevronLeft className="icons" id="scrollLeft" />
          <ChevronRight className="icons" id="scrollRight" />
        </div>
        <div className="topchart-search">
          <Form handleSubmit={handleSearchQuery} />
        </div>
        <h3 className="topchart-heading">Billboard Topchart</h3>
      </div>
      <div ref={scroller} className="charts-container">
        {status === 'resolved' ? (
          data?.playlists.items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.name}
              name={item.name}
              img={item.images[0].url}
              type={item.type}
              subtitle={`Total Tracks: ${item.tracks.total}`}
              handleClick={setCurrentPlayList}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default TopChart;
