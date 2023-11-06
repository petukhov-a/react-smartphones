import React, { FC, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { Smartphone } from '../redux/smartphones/types';
import { addCartItem } from '../redux/cart/slice';
import { Link } from 'react-router-dom';
import CountInput from './CartInput';

type AddCartBtnProps = {
    item: Smartphone;
    isCountOnRight: boolean;
}

const AddCartBtn: FC<AddCartBtnProps> = ( {item, isCountOnRight} ) => {

    const dispatch = useDispatch();
    const { items: cartItems } = useSelector(selectCart);
    const { id, name, img, rating, price } = item;
    
    const currentCartItem = cartItems.find((item) => item.id === id);
  
    const onClickAddCart = () => {
      if (!currentCartItem) {
        dispatch(addCartItem({ id, img, price, name, rating, count: 1 }));
      }
    };
  
    const onClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
      if (!currentCartItem) {
        e.preventDefault();
      }
    }

  return (
    <div className={isCountOnRight ? 'add-cart-block count-right' : 'add-cart-block'}>
      {currentCartItem && <CountInput cartItem={currentCartItem} isRemoveOnMinus={true} />}
      <Link to="/cart" onClick={(e) => onClickLink(e)} className='checkout-link'>
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
  );
}

export default AddCartBtn