import * as React from 'react';

import { ArrowLeft } from 'react-feather';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { CATEGORIES_URL } from '../../constants';
import { useClient, useAsync } from '../../hooks';

import './CategoryStyles.scss';

interface CategoryType {
  id: string;
  name: string;
  title: string;
  images: Array<Record<string, string>>;
  tracks: { total: number };
}

interface AsyncData {
  playlists: {
    items: Array<CategoryType>;
  };
}

function Category(): JSX.Element {
  const client = useClient();
  const { data, run, status, error } = useAsync<AsyncData>();
  const { id } = useParams<{ id: string }>();
  const {
    state: { name },
  } = useLocation<{ name: string }>();
  const history = useHistory();

  const url = `${CATEGORIES_URL}/${id}/playlists`;

  React.useEffect(() => {
    run(client(url));
  }, []);

  const handleBack = (): void => {
    history.push('/browse');
  };

  if (status === 'rejected') {
    throw error as Error;
  }

  const getID = (currentPlayList: { id: string; type: string }): void => {
    history.push('/', { currentPlayList });
  };

  return (
    <div className="category">
      <div className="category__header">
        <div
          className="category__back"
          onClick={handleBack}
          onKeyPress={handleBack}
          role="button"
          tabIndex={0}
        >
          <ArrowLeft />
        </div>
        <h2 className="category__title">{name}</h2>
      </div>
      <div className="category__content">
        {status === 'resolved' ? (
          data?.playlists.items.map((list) => (
            <div className="category__list" key={list.id}>
              <Card
                key={list.id}
                id={list.id}
                title={list.name}
                name={list.name}
                img={list.images[0].url}
                type="playlists"
                subtitle={`Total Tracks: ${list.tracks.total}`}
                handleClick={getID}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      ;
    </div>
  );
}

export default Category;
