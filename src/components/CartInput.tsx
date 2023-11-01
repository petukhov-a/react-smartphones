import React, { ChangeEvent, FC } from 'react';

import plusSvg from '../assets/img/plus.svg';
import minusSvg from '../assets/img/minus.svg';
import { useDispatch } from 'react-redux';
import { addCartItem, minusCartItem, removeCartItem, setCount } from '../redux/cart/slice';

type CartItemProps = {
    cartItem: CartItem;
    isRemoveOnMinus: boolean;
}

const CartInput: FC<CartItemProps> = ( {cartItem, isRemoveOnMinus} ) => {

    const { id, count } = cartItem;

    const dispatch = useDispatch();

    const oncClickInc = () => {
      dispatch(addCartItem(cartItem));
    };

    const onClickDec = () => {
      if (isRemoveOnMinus && count === 1) {
        dispatch(removeCartItem(id));
      } else {
        dispatch(minusCartItem(id));
      }
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      const count = Number(e.target.value);

      dispatch(setCount({ count, id }));
    };

  return (
    <div className="cart-item-count">
      <button className="minus" onClick={onClickDec} disabled={!isRemoveOnMinus && count === 1}>
        <img className="minus" src={minusSvg} alt="" />
      </button>
      <input type="number" value={count} onChange={onChangeInput} />
      <button className="plus" onClick={oncClickInc}>
        <img className="plus" src={plusSvg} alt="" />
      </button>
    </div>
  );
}

export default CartInput;