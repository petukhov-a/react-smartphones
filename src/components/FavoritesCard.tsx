import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { removeFavoritesItem } from '../redux/favorites/slice';
import { addCartItem } from '../redux/cart/slice';

type FavoritesCardProps = {
  item: CartItem;
}

const FavoritesCard: FC<FavoritesCardProps> = ( {item} ) => {
  const {name, price, img, id, rating} = item;
  const dispatch = useDispatch();

  return (
    <div className="card-container card-hover">
      <div className="favorites-card">
        <div className="favorites-card-header">
          <div className="favorites-card__img">
            <img src={img} alt="" />
          </div>
          <a href="./../pages/smartphonePage.html" className="favorites-card__name">
            {name}
          </a>
        </div>
        <div
          className="favorites-card-footer"
          onClick={() => dispatch(addCartItem({name, price, img, id, rating, count: 1}))}>
          <p className="price">
            {price} <span>₽</span>
          </p>
          <button
            className="favorites-card__cart-btn">
            <svg
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg">
              <title />
              <path
                fill="#fff"
                d="M12.2,9h1.6V6.8H16V5.2H13.8V3H12.2V5.2H10V6.8h2.2ZM20,5v5.5L7.45,12.72,5,3H1.25a1,1,0,0,0,0,2H3.47L6.7,18H20V16H8.26l-.33-1.33L22,12.18V5ZM7,19a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,7,19Zm12,0a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,19,19Z"
              />
            </svg>
          </button>
        </div>
        <button
          className="favorites-card__remove-btn"
          onClick={() => dispatch(removeFavoritesItem(id))}>
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 5L4.99998 19M5.00001 5L19 19"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FavoritesCard;
