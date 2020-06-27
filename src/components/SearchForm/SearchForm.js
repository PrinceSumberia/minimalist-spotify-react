import React, { memo } from "react";
import { Search } from "react-feather";
import useInputState from "../../hooks/useInputState";
import "./SearchFormStyles.scss";

function SearchForm() {
  const [searchInput, handleSearchInput, resetSearchInput] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetSearchInput();
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
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
