import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Result from "./Result";
import "./SearchResultStyles.scss";

function SearchResult() {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

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
