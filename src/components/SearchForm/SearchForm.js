import React from "react";
import "./SearchFormStyles.scss";
import { Search } from "react-feather";

function SearchForm() {
  return (
    <form className="search">
      <input name="" id="" className="search__input" placeholder="Search..." />
      <div className="search__button">
        <Search className="search__icon" />
      </div>
    </form>
  );
}

export default SearchForm;
