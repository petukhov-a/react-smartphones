import React, { ChangeEvent, FC, MouseEvent, useEffect } from 'react';
import smartphoneImg from '../assets/img/smartphones/DOOGEE-V30.webp';
import { Smartphone } from '../redux/smartphones/types';
import { Link } from 'react-router-dom';
import { addCartItem, minusCartItem, removeCartItem, setCount } from '../redux/cart/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import CountInput from './CartInput';
import { addFavoritesItem } from '../redux/favorites/slice';

const SmartphoneCard: FC<Smartphone> = ({
  id,
  name,
  img,
  rating,
  price,
  screenType,
  screenTypeFull,
  screenSize,
  screenResolution,
  processor,
  ram,
  internalStorage,
  networkSupport,
  fingerprintScanner,
  dimensions,
}) => {

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const currentCartItem = cart.items.find((item) => item.id === id);

  const onClickAddCart = () => {
    if (!currentCartItem) {
      dispatch(addCartItem({ id, img, price, name, count: 1 }));
    }
  };

  const onClickAddFavorites = () => {
    dispatch(addFavoritesItem({ id, img, price, name, count: 1 }));
  }

  const onClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!currentCartItem) {
      e.preventDefault();
    }
  }

  return (
    <>
      <div className="smartphone-card card-hover">
        <div className="smartphone-card-wrapper">
          <Link to="/smartphone" className="smartphone-card__img">
            <img src={img} alt="" />
          </Link>
          <div className="smartphone-card-desq">
            <div className="smartphone-card-heading">
              <Link to="/smartphone" className="smartphone-name">
                {name}
              </Link>
              <p className="smartphone-id">Код товара: {id}</p>
            </div>
            <div className="separator"></div>
            <ul className="smartphone-card-specs">
              <li>
                <span>Экран&nbsp;</span>
                {screenTypeFull}, {screenSize}" ({screenResolution});
              </li>
              <li>
                <span>Процессор&nbsp;</span>
                {processor};
              </li>
              <li>
                <span>Память&nbsp;</span>оперативная {ram} ГБ, встроенная {internalStorage} ГБ;
              </li>
              <li>
                <span>Поддержка сетей&nbsp;</span>
                {networkSupport};
              </li>
              <li>
                <span>Сканер отпечатка пальцев&nbsp;</span>
                {fingerprintScanner};
              </li>
              <li>
                <span>Размеры (ШхВхТ)&nbsp;</span>
                {dimensions.width} х {dimensions.height} х {dimensions.thickness} мм;
              </li>
            </ul>
          </div>
          <div className="smartphone-card-add-cart">
            <div className="price">
              <p>
                {price} <span>₽</span>
              </p>
            </div>
            <div className="smartphone-card-add-cart-action">
              {currentCartItem && 
                <CountInput cartItem={currentCartItem} isRemoveOnMinus={true} />}
              <Link to='/cart' onClick={(e) => onClickLink(e)}>
                <button className="btn btn-icon" onClick={onClickAddCart}>
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
                  <span>{currentCartItem ? 'Оформить заказ' : 'В корзину'}</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="smartphone-card__add-favorites">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              onClick={onClickAddFavorites}>
              <g id="Bookmark">
                <path d="M17.6,21.945a1.483,1.483,0,0,1-1.01-.4l-4.251-3.9a.5.5,0,0,0-.68,0L7.409,21.545a1.5,1.5,0,0,1-2.516-1.1V4.57a2.5,2.5,0,0,1,2.5-2.5h9.214a2.5,2.5,0,0,1,2.5,2.5V20.442a1.481,1.481,0,0,1-.9,1.374A1.507,1.507,0,0,1,17.6,21.945ZM12,16.51a1.5,1.5,0,0,1,1.018.395l4.251,3.9a.5.5,0,0,0,.839-.368V4.57a1.5,1.5,0,0,0-1.5-1.5H7.393a1.5,1.5,0,0,0-1.5,1.5V20.442a.5.5,0,0,0,.839.368L10.983,16.9A1.5,1.5,0,0,1,12,16.51Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="separator"></div>
    </>
  );
};

export default SmartphoneCard;
