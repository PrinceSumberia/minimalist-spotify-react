import * as React from 'react';

import { useHistory } from 'react-router-dom';

import { CATEGORIES_URL } from '../../constants';
import { useClient, useAsync } from '../../hooks';
import Loader from '../Loader';

import './CategoriesStyles.scss';

interface AsyncData {
  categories: {
    items: Array<{ id: string; name: string; icons: Array<{ url: string }> }>;
  };
}

function Categories() {
  const history = useHistory();
  const client = useClient();
  const { data, status, run } = useAsync<AsyncData>();

  React.useEffect(() => {
    run(client(CATEGORIES_URL));
  }, []);

  const handleClick = (id: string, name: string): void => {
    history.push({
      pathname: `/browse/category/${id}`,
      state: { name },
    });
  };

  return status === 'resolved' ? (
    <div className="categories">
      {data?.categories.items.map((item) => (
        <div
          key={item.id}
          id={item.id}
          className="categories__container"
          onClick={() => handleClick(item.id, item.name)}
          onKeyPress={() => handleClick(item.id, item.name)}
          tabIndex={0}
          role="button"
        >
          <div className="categories__media">
            <img
              alt={item.name}
              src={item.icons[0].url}
              className="categories__media__img"
            />
          </div>
          <div className="categories__title">
            <h3>{item.name}</h3>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loader />
  );
}

export default Categories;
