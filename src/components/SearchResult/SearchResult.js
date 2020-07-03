import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./SearchResultStyles.scss";
import Result from "../Result/Result";

function SearchResult(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      if (props.location.state.query) {
        setQuery(props.location.state.query);
        setIsLoading(false);
      }
    } catch (err) {}
  }, [props.location]);

  const handleQuery = (query) => {
    setQuery(query);
    setIsLoading(false);
  };

  return (
    <div className="searchresult">
      <div className="searchresult__form">
        <SearchForm handleSubmit={handleQuery} />
      </div>
      {!isLoading && <Result query={query} />}
    </div>
  );
}

export default SearchResult;
