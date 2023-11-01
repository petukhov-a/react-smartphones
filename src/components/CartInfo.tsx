import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/slice';
import { selectCart } from '../redux/cart/selectors';
import { productsString } from '../utils/formatProductsString';
import { addFavoritesItem } from '../redux/favorites/slice';

const CartInfo = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const { totalCount, totalPrice } = useSelector(selectCart);

  const onClickClear = () => {
    dispatch(clearCart());
  }

  const onClickAddFavoritesAll = () => {
    items.forEach(item => dispatch(addFavoritesItem(item)));
  }
  
  return (
    <div className="cart-info">
      <div className="cart-info-wrapper">
        <div className="cart-info__heading">
          <h1 className="">В корзине</h1>
          <p className="сart-info__items-count">{totalCount} {productsString(totalCount)}</p>
        </div>
        <p className="price">
          {totalPrice} <span>₽</span>
        </p>
        <button className="btn btn-goto-order">
          <span>Перейти к оформлению</span>
        </button>
      </div>
      <div className="cart-info-btns">
        <button
          className="btn-outline-gray btn-add-favorites"
          onClick={onClickAddFavoritesAll}>
          <span>Добавить все в избранное</span>
        </button>
        <button className="btn-outline-gray btn-clear-cart" onClick={onClickClear}>
          <span>Очистить корзину</span>
        </button>
      </div>
    </div>
  );
}

export default CartInfo