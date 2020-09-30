import React, { memo } from "react";
import { Search } from "react-feather";

import useInputState from "../../hooks/useInputState";

import "./SearchFormStyles.scss";

function SearchForm({ handleSubmit }) {
  const [searchInput, handleSearchInput, resetSearchInput] = useInputState("");

  const handleFormSubmit = (e) => {
    handleSubmit(searchInput.trim().replace(/ /g, "+"));
    e.preventDefault();
    resetSearchInput();
  };

  return (
    <form className="search" onSubmit={handleFormSubmit}>
      <input
        value={searchInput}
        className="search__input"
        placeholder="Search..."
        onChange={handleSearchInput}
      />
      <button className="search__button">
        <Search className="search__icon" />
      </button>
    </form>
  );
}

export default memo(SearchForm);
