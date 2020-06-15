import React from "react";
import "./SearchFormStyles.scss";
import { Search } from "react-feather";
import useInputState from "../../hooks/useInputState";

function SearchForm() {
  const [searchInput, handleSearchInput, resetSearchInput] = useInputState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    resetSearchInput();
  }
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input value={searchInput} className="search__input" placeholder="Search..." onChange={handleSearchInput} />
      <button className="search__button">
        <Search className="search__icon" />
      </button>
    </form>
  );
}

export default SearchForm;
