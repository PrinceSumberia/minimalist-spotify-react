import * as React from 'react';

import { Search as SearchIcon } from 'react-feather';

import { useInputState } from '../../hooks';

import './FormStyles.scss';

interface PropType {
  handleSubmit: (query: string) => void;
}

function Form({ handleSubmit }: PropType) {
  const { value, handleChange, reset } = useInputState('');

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleSubmit(value.trim().replace(/ /g, '+'));
    reset();
  };

  return (
    <form className="search" onSubmit={handleFormSubmit}>
      <input
        value={value}
        className="search__input"
        placeholder="Search..."
        onChange={handleChange}
      />
      <button className="search__button" type="submit">
        <SearchIcon className="search__icon" />
      </button>
    </form>
  );
}

export default Form;
