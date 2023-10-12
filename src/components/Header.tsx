import React from 'react';
import Nav from './Nav';
import Search from './Search';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <a href="./../index.html" className="header-logo">
            <p className="header-logo__letter">K</p>
            <p className="header-logo__text">китипинк</p>
          </a>
          <Search />
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;