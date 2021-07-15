import * as React from 'react';

import classNames from 'classnames';

import Categories from '../../components/Categories';

import './BrowseStyles.scss';

const Featured = React.lazy(() => import('../../components/Featured'));

function Browse(): JSX.Element {
  const [currentView, setCurrentView] = React.useState('category');

  const handleClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if ((event.target as HTMLButtonElement).tagName === 'BUTTON') {
      setCurrentView((event.target as HTMLButtonElement).value);
    }
  };

  const getCurrentView = () => {
    switch (currentView) {
      case 'category':
        return <Categories />;
      case 'featured':
        return <Featured />;
      default:
        return <Categories />;
    }
  };

  return (
    <div className="browse">
      <div
        className="btn-container"
        onKeyPress={handleClick}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <button
          type="button"
          className={classNames('btn-view', {
            'btn-view--active': currentView === 'category',
          })}
          value="category"
        >
          Categories
        </button>
        <button
          type="button"
          className={classNames('btn-view', {
            'btn-view--active': currentView === 'featured',
          })}
          value="featured"
        >
          Featured
        </button>
      </div>
      <div className="browse__container">
        <React.Suspense fallback={<div>loading....</div>}>
          {getCurrentView()}
        </React.Suspense>
      </div>
    </div>
  );
}

export default Browse;
