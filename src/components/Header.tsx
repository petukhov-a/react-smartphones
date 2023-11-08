import { useEffect, useRef } from 'react';
import Nav from './Nav';
import Search from './Search';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { selectFavorites } from '../redux/favorites/selectors';

const Header = () => {
  const { items: cartItems } = useSelector(selectCart);
  const { items: favoritesItems } = useSelector(selectFavorites);
  const isMounted = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (isMounted.current) {
      const jsonCart = JSON.stringify(cartItems);
      localStorage.setItem('cart', jsonCart);

      const jsonFavorites = JSON.stringify(favoritesItems);
      localStorage.setItem('favorites', jsonFavorites);
    }
    isMounted.current = true;
  }, [cartItems, favoritesItems]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <Link to="/" className="header-logo">
            <p className="header-logo__letter">K</p>
            <p className="header-logo__text">китипинк</p>
          </Link>
          {location.pathname === '/' && <Search />}
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;