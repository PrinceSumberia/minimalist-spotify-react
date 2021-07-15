import * as React from 'react';

import { useLocation } from 'react-router-dom';

import Form from '../../components/Form';
import SearchResult from '../../components/SearchResult';

import './SearchStyles.scss';

function Search() {
  const location = useLocation<{ query: string }>();
  const [queryInput, setQueryInput] = React.useState(() => {
    try {
      return location.state.query;
    } catch (error) {
      return '';
    }
  });

  const handleQuery = (query: string) => {
    setQueryInput(query);
  };

  return (
    <div className="searchresult">
      <div className="searchresult__form">
        <Form handleSubmit={handleQuery} />
      </div>
      {queryInput && <SearchResult query={queryInput} />}
    </div>
  );
}

export default Search;
