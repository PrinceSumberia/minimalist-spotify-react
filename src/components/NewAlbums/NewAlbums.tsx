import React from 'react';

import { ChevronLeft, ChevronRight, Loader } from 'react-feather';

import { NEWALBUMS_URL } from '../../constants';
import { useClient, useAsync } from '../../hooks';
import { scroll } from '../../utils/helpers';
import { CurrentPlayListType } from '../../utils/types';
import Card from '../Card';

import './NewAlbumsStyles.scss';

interface PropType {
  setCurrentPlayList: React.Dispatch<React.SetStateAction<CurrentPlayListType>>;
}

interface AsyncData {
  albums: {
    items: Array<{
      album_type: string;
      name: string;
      uri: string;
      id: string;
      images: Array<{ url: string }>;
    }>;
  };
}

function NewAlbums({ setCurrentPlayList }: PropType) {
  const scroller = React.useRef<any>();
  const client = useClient();
  const { run, data, status, error } = useAsync<AsyncData>();

  React.useEffect(() => {
    run(client(NEWALBUMS_URL));
  }, [NEWALBUMS_URL]);

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    scroll((e.target as HTMLDivElement).id, scroller);
  };

  if (status === 'rejected') {
    throw error as Error;
  }

  return (
    <div className="newalbum">
      <div className="newalbum__container">
        <h4 className="newalbum__title">Latest Albums</h4>
        <div
          className="scrollers"
          onClick={handleScroll}
          onKeyPress={handleScroll}
          tabIndex={0}
          role="button"
        >
          <ChevronLeft className="icons newalbum__scrollers" id="scrollLeft" />
          <ChevronRight
            className="icons newalbum__scrollers"
            id="scrollRight"
          />
        </div>
      </div>
      <div className="newalbum__cards" ref={scroller}>
        {status === 'resolved' ? (
          data?.albums.items
            .filter((item) => item.album_type === 'album')
            .map((item) => {
              const index = item.name.search(/\(/);
              return {
                name: (index !== -1 ? item.name.slice(0, index) : item.name)
                  .trim()
                  .toLowerCase(),
                uri: item.uri,
                id: item.id,
                thumbnail: item.images[0],
                img: item.images[1].url,
              };
            })
            .map(({ name, img, id }) => (
              <div key={id} className="newalbum__cards--space">
                <Card
                  name={name}
                  id={id}
                  img={img}
                  type="albums"
                  handleClick={setCurrentPlayList}
                />
              </div>
            ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default NewAlbums;
