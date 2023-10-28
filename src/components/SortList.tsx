import React, {MouseEvent, FC, useState, useRef, useEffect } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { handleOutsideClick } from '../utils/handleOutsideClick';
import { Sort } from '../redux/filter/types';

type SortProps = {
  onChangeSort: (sort: Sort, isMobile: boolean) => void;
  isAsc: boolean;
}

export const sortList: Sort[] = [
  {name: "по цене", property: "price"},
  {name: "по рейтингу", property: "rating"},
  {name: "по названию", property: "name"},
];

const mobileSortList: Sort[] = [
  {name: 'по возрастанию цены', property: 'price', isAsc: true},
  {name: 'по убыванию цены', property: 'price', isAsc: false},
  {name: 'по возрастанию рейтинга', property: 'rating', isAsc: true},
  {name: 'по убыванию рейтинга', property: 'rating', isAsc: false},
  {name: 'по названию (от А до Я)', property: 'name', isAsc: true},
  {name: 'по названию (от Я до А)', property: 'name', isAsc: false},
]

const SortList: FC<SortProps> = ({onChangeSort, isAsc}) => {

  const clazz = isAsc ? ' rotate' : '';
  const { sort } = useSelector(selectFilter); 
  const sortListMobileRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const sortList = sortListMobileRef.current;

    document.addEventListener('click', (e) => handleOutsideClick(e, setIsShow, sortList));

    return document.removeEventListener('click', (e) => handleOutsideClick(e, setIsShow, sortList));
  }, []);

  useEffect(() => {
    const sortList = sortListMobileRef.current as HTMLDivElement;

    if (isShow) {
      sortList.classList.add('active');
    } else {
      sortList.classList.remove('active');
    }
  }, [isShow]);

  const onSelectItem = (item: Sort, isMobile: boolean) => {
    onChangeSort(item, isMobile);
    if (isMobile) {
      setIsShow(false);
    }
  }

  const sortItemsElements = sortList.map((item, index) => (
    <li
      onClick={() => onSelectItem(item, false)}
      className={item.property === sort.property ? 'active' : ''}
      key={index}>
        {item.name}
      <img
        className={"sort-order-img" + clazz}
        src={sortDescending} />
    </li>
  ));

  const mobileSortItems = mobileSortList.map((item, index) => (
    <li 
      onClick={() => onSelectItem(item, true)}
      key={index}
      className={item.property === sort.property ? 'active': ''}>
        {item.name}
    </li>
  ));

  return (
    <div className="sort">
      <div className="sort-list">
        <ul>
          {sortItemsElements}
        </ul>
      </div>
      <div className="sort-list-mobile" ref={sortListMobileRef}>
        <button className="sort-list-mobile-btn" onClick={() => setIsShow(isShow => !isShow)}>
          <span>
            {sort.name}
          </span>
        </button>
        <img className='drop-down-arrow' src={dropDownArrow} alt="" />
        <ul>
          {mobileSortItems}
        </ul>
      </div>
    </div>
  );
}

export default SortList;