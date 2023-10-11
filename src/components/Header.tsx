import React from 'react';
import searchIcon from '../assets/img/search.svg';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <a href="./../index.html" className="header-logo">
            <p className="header-logo__letter">K</p>
            <p className="header-logo__text">китипинк</p>
          </a>
          <div className="header-search">
            <input type="text" className="header-search__input" placeholder="iPhone 15 Pro" />
            <img src={searchIcon} alt="" className="header-search__icon" />
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;