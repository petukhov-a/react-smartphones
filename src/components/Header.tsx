import React, { useEffect, useReducer, useRef } from 'react';
import Nav from './Nav';
import Search from './Search';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';

const Header = () => {
  const { items } = useSelector(selectCart);
  const isMounted = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <Link to="/" className="header-logo">
            <p className="header-logo__letter">K</p>
            <p className="header-logo__text">китипинк</p>
          </Link>
          {(location.pathname !== '/cart') && <Search />}
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;