import React, { ChangeEvent, useCallback, useReducer, useRef, useState } from 'react';
import searchIcon from '../assets/img/search.svg';
import { setSearchValue } from '../redux/filter/slice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  } 

  return (
    <div className="header-search">
      <input
        type="text"
        value={value}
        className="header-search__input"
        placeholder="iPhone 15 Pro"
        onChange={(e) => onChangeInput(e)}
        ref={inputRef}
      />
      {value && (
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="header-search__clear-icon"
          onClick={onClickClear}>
          <path
            d="M19 5L4.99998 19M5.00001 5L19 19"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      <img src={searchIcon} alt="" className="header-search__icon" />
    </div>
  );
}

export default Search