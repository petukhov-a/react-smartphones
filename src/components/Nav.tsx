import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../redux/cart/selectors';

const Nav = () => {
  const { totalCount } = useSelector(selectCart);

  return (
    <nav className="nav">
      <Link to="/favorites" className="nav__link">
        <div className="nav__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 24 24">
            <g id="Bookmark">
              <path d="M17.6,21.945a1.483,1.483,0,0,1-1.01-.4l-4.251-3.9a.5.5,0,0,0-.68,0L7.409,21.545a1.5,1.5,0,0,1-2.516-1.1V4.57a2.5,2.5,0,0,1,2.5-2.5h9.214a2.5,2.5,0,0,1,2.5,2.5V20.442a1.481,1.481,0,0,1-.9,1.374A1.507,1.507,0,0,1,17.6,21.945ZM12,16.51a1.5,1.5,0,0,1,1.018.395l4.251,3.9a.5.5,0,0,0,.839-.368V4.57a1.5,1.5,0,0,0-1.5-1.5H7.393a1.5,1.5,0,0,0-1.5,1.5V20.442a.5.5,0,0,0,.839.368L10.983,16.9A1.5,1.5,0,0,1,12,16.51Z" />
            </g>
          </svg>
          <div className="favorites-counter counter">3</div>
        </div>
        <p>Избранное</p>
      </Link>
      <Link to="/cart" className="nav__link">
        <div className="nav__icon">
          <svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
            <g id="icomoon-ignore"></g>
            <path
              d="M30.622 9.602h-22.407l-1.809-7.464h-5.027v1.066h4.188l5.198 21.443c-1.108 0.323-1.923 1.334-1.923 2.547 0 1.472 1.193 2.666 2.666 2.666s2.666-1.194 2.666-2.666c0-0.603-0.208-1.153-0.545-1.599h7.487c-0.337 0.446-0.545 0.997-0.545 1.599 0 1.472 1.193 2.666 2.665 2.666s2.666-1.194 2.666-2.666c0-1.473-1.193-2.665-2.666-2.666v0h-11.403l-0.517-2.133h14.968l4.337-12.795zM13.107 27.196c0 0.882-0.717 1.599-1.599 1.599s-1.599-0.717-1.599-1.599c0-0.882 0.717-1.599 1.599-1.599s1.599 0.718 1.599 1.599zM24.836 27.196c0 0.882-0.718 1.599-1.6 1.599s-1.599-0.717-1.599-1.599c0-0.882 0.717-1.599 1.599-1.599 0.882 0 1.6 0.718 1.6 1.599zM11.058 21.331l-2.585-10.662h20.662l-3.615 10.662h-14.462z"
              fill="#000000"></path>
          </svg>
          {totalCount !== 0 &&
            <div className="cart-counter counter">{totalCount}</div>}
        </div>
        <p>Корзина</p>
      </Link>
    </nav>
  );
}

export default Nav