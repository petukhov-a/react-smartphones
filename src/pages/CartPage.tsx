import React from 'react';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import CartInfo from '../components/CartInfo';
import { Link } from 'react-router-dom';

const CartPage = () => {
  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="cart-heading">
            <Link to='/' className="cart__exit">
              Вернуться к покупкам
            </Link>
            <h1 className="cart__heading">Корзина</h1>
          </div>
          <div className="cart-wrapper">
            <div className="cart-items">
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
            <CartInfo />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage