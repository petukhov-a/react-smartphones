import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

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
    const countBlockRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(count);

    const dispatch = useDispatch();

    const oncClickInc = () => {
      dispatch(addCartItem(cartItem));
    };

    useEffect(() => {
      const countBlock = countBlockRef.current;
      const input = inputRef.current;

      const handleOutsideClick = (event: MouseEvent) => {
        if (countBlock && input && !event.composedPath().includes(countBlock)) {
          const count = Number(input.value);
          if (count === 0) {
            setInputValue(1);
            dispatch(setCount({ count: 1, id }));
          } else {
            setInputValue(count);
            dispatch(setCount({ count, id }))
          }
        }
      }

      document.body.addEventListener('click', handleOutsideClick);

      return () => document.body.removeEventListener('click', handleOutsideClick);
    }, []);

    const onClickDec = () => {
      if (isRemoveOnMinus && count === 1) {
        dispatch(removeCartItem(id));
      } else {
        dispatch(minusCartItem(id));
      }
    };

    useEffect(() => {
      setInputValue(count);
    }, [count]);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      const count = Number(value.slice(0, 3));

      setInputValue(count);
    };

  return (
    <div ref={countBlockRef} className="cart-item-count">
      <button className="minus" onClick={onClickDec} disabled={!isRemoveOnMinus && count <= 1}>
        <img className="minus" src={minusSvg} alt="" />
      </button>
      <input ref={inputRef} type="number" value={inputValue.toFixed(0)} onChange={onChangeInput} />
      <button className="plus" onClick={oncClickInc}>
        <img className="plus" src={plusSvg} alt="" />
      </button>
    </div>
  );
}

export default CartInput;