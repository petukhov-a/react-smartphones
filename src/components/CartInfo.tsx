import React from 'react'

const CartInfo = () => {
  return (
    <div className="cart-info">
      <div className="cart-info-wrapper">
        <div className="cart-info__heading">
          <h1 className="">В корзине</h1>
          <p className="сart-info__items-count">2 товара</p>
        </div>
        <p className="price">
          86 280 <span>₽</span>
        </p>
        <button className="btn btn-goto-order">
          <span>Перейти к оформлению</span>
        </button>
      </div>
      <div className="cart-info-btns">
        <button className="btn-outline-gray btn-add-favorites">
          <span>Добавить все в избранное</span>
        </button>
        <button className="btn-outline-gray btn-clear-cart">
          <span>Очистить корзину</span>
        </button>
      </div>
    </div>
  );
}

export default CartInfo