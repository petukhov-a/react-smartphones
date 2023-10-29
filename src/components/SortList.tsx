import React, {MouseEvent, FC, useState, useRef, useEffect } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { handleOutsideClick } from '../utils/handleOutsideClick';
import { Sort } from '../redux/filter/types';

type SortProps = {
  onChangeSort: (sort: Sort, isMobile: boolean, index: number) => void;
  isAsc: boolean;
}

export const sortList: Sort[] = [
  {title: "по цене", property: "price"},
  {title: "по рейтингу", property: "rating"},
  {title: "по названию", property: "name"},
];

export const mobileSortList: Sort[] = [
  {mobileTitle: 'по возрастанию цены', property: 'price', isAsc: true},
  {mobileTitle: 'по убыванию цены', property: 'price', isAsc: false},
  {mobileTitle: 'по возрастанию рейтинга', property: 'rating', isAsc: true},
  {mobileTitle: 'по убыванию рейтинга', property: 'rating', isAsc: false},
  {mobileTitle: 'по названию (от А до Я)', property: 'name', isAsc: true},
  {mobileTitle: 'по названию (от Я до А)', property: 'name', isAsc: false},
]

export const sortMobileTitles = {
  price: {
    asc: "по возрастанию цены",
    desc: "по убыванию цены",
  },
  rating: {
    asc: "по возрастанию рейтинга",
    desc: "по убыванию рейтинга"
  },
  name: {
    asc: "по названию (от А до Я)",
    desc: "по названию (от Я до А)"
  }
}

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

  const onSelectItem = (item: Sort, isMobile: boolean, index: number) => {
    onChangeSort(item, isMobile, index);
    if (isMobile) {
      setIsShow(false);
    }
  }

  const sortItemsElements = sortList.map((item, index) => (
    <li
      onClick={() => onSelectItem(item, false, index)}
      className={item.property === sort.property ? 'active' : ''}
      key={index}>
        {item.title}
      <img
        className={"sort-order-img" + clazz}
        src={sortDescending} />
    </li>
  ));

  const mobileSortItems = mobileSortList.map((item, index) => (
    <li 
      onClick={() => onSelectItem(item, true, index)}
      key={index}
      className={item.property === sort.property ? 'active': ''}>
        {item.mobileTitle}
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
            {sort.mobileTitle}
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