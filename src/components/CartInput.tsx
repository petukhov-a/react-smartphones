import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

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
    const inputRef = useRef<HTMLInputElement>(null);

    const oncClickInc = () => {
      dispatch(addCartItem(cartItem));
    };

    const onClickDec = () => {
        dispatch(minusCartItem(id));
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      const count = Number(e.target.value);

      dispatch(setCount({ count, id }));
    };

    useEffect(() => {
      if (count < 1 &&
          inputRef.current !== document.activeElement) {
        dispatch(removeCartItem(id));
      }
    }, [count]);


  return (
    <div className="cart-item-count">
      <button className="minus" onClick={onClickDec} disabled={!isRemoveOnMinus && count === 1}>
        <img className="minus" src={minusSvg} alt="" />
      </button>
      <input
        type="number"
        value={count || ''} onChange={onChangeInput}
        ref={inputRef} />
      <button className="plus" onClick={oncClickInc}>
        <img className="plus" src={plusSvg} alt="" />
      </button>
    </div>
  );
}

export default CartInput;