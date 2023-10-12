import React from 'react';
import searchIcon from '../assets/img/search.svg';

const Search = () => {
  return (
    <div className="header-search">
      <input type="text" className="header-search__input" placeholder="iPhone 15 Pro" />
      <img src={searchIcon} alt="" className="header-search__icon" />
    </div>
  );
}

export default Search