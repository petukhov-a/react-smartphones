import React, {MouseEvent, FC, useState, useRef, useEffect } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { handleOutsideClick } from '../utils/handleOutsideClick';

type SortProps = {
  onChangeSort: (sortName: string) => void;
  isAsc: boolean;
}

export const sortList = [
  {name: "по цене", sortProperty: "price"},
  {name: "по рейтингу", sortProperty: "rating"},
  {name: "по названию", sortProperty: "name"},
];

const Sort: FC<SortProps> = ({onChangeSort, isAsc}) => {

  const clazz = isAsc ? ' rotate' : '';
  const { sortProperty } = useSelector(selectFilter); 
  const sortListRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const sortList = sortListRef.current;

    document.addEventListener('click', (e) => handleOutsideClick(e, setIsShow, sortList));

    return document.removeEventListener('click', (e) => handleOutsideClick(e, setIsShow, sortList));
  }, []);

  useEffect(() => {
    const sortList = sortListRef.current as HTMLDivElement;

    if (isShow) {
      sortList.classList.add('active');
    } else {
      sortList.classList.remove('active');
    }
  }, [isShow]);

  const sortItemsElements = sortList.map((item, index) => (
    <li
      onClick={() => onChangeSort(item.sortProperty)}
      className={item.sortProperty === sortProperty ? 'active' : ''}
      key={index}>
        {item.name}
      <img
        className={"sort-order-img" + clazz}
        src={sortDescending} />
    </li>
  ));

  return (
    <div className="sort">
      <div className="sort-list">
        <ul>
          {sortItemsElements}
        </ul>
      </div>
      <div className="sort-list-mobile" ref={sortListRef}>
        <button className="sort-list-mobile-btn" onClick={() => setIsShow(isShow => !isShow)}>
          <span>по рейтингу</span>
        </button>
        <img className='drop-down-arrow' src={dropDownArrow} alt="" />
        <ul>
          <li>по возрастанию цены</li>
          <li>по убыванию цены</li>
          <li>по рейтингу</li>
          <li>по названию (от А до Я)</li>
          <li>по названию (от Я до А)</li>
        </ul>
      </div>
    </div>
  );
}

export default Sort;