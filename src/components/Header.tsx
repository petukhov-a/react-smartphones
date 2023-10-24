import React from 'react';
import Nav from './Nav';
import Search from './Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <Link to="/" className="header-logo">
            <p className="header-logo__letter">K</p>
            <p className="header-logo__text">китипинк</p>
          </Link>
          <Search />
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;