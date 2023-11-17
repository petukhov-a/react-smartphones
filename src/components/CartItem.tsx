import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../redux/cart/slice';
import CountInput from './CartInput';
import FavoritesIcon from './FavoritesIcon';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

type CartItemProps = {
  item: CartItem;
};

const CartItem: FC<CartItemProps> = ({ item }) => {
  const { id, img, name, price, rating } = item;

  const dispatch = useDispatch();

  const onClickRemove = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="cart-item">
      <Link to={`/smartphone/${id}`}>
        <div className="cart-item__img">
          <img src={img} alt="" />
        </div>
      </Link>
      <div className="cart-item-desq">
        <div className="smartphone-id">Код товара: {id}</div>
        <Link to={`/smartphone/${id}`} className="cart-item-desq__title">
          {name}
        </Link>
      </div>
      <div className="cart-item-price">
        <CountInput cartItem={item} isRemoveOnMinus={false} />
        <div className="price">
          <p>
            {formatPrice(price)} <span>₽</span>
          </p>
        </div>
      </div>
      <div className="cart-item-icons">
        <div className="fav-icon">
          <FavoritesIcon item={ {id, img, price, name, rating, count: 1} }/>
        </div>
        <div onClick={onClickRemove}>
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            width="64px"
            height="64px"
            className="trash-icon">
            <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
