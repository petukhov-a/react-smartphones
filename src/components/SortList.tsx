import React, {MouseEvent, FC, useState, useRef, useEffect } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { handleOutsideClick } from '../utils/handleOutsideClick';
import { Sort } from '../redux/filter/types';
import { setSort } from '../redux/filter/slice';

// type SortProps = {
//   onChangeSort: (sort: Sort, isMobile: boolean, index: number) => void;
//   isAsc: boolean;
// }

export enum SortTitle {
  price = "по цене",
  rating = "по рейтингу",
  name = "по названию",
  priceAsc = "по возрастанию цены",
  priceDesc = "по убыванию цены",
  raingAsc = "по возрастанию рейтинга",
  ratingDesc = "по убыванию рейтинга",
  nameAsc = "по названию (от А до Я)",
  nameDesc = "по названию (от Я до А)"
}

export const sortList: Sort[] = [
  {title: SortTitle.price, property: "price", isAsc: false},
  {title: SortTitle.rating, property: "rating", isAsc: false},
  {title: SortTitle.name, property: "name", isAsc: false},
];

export const mobileSortList: Sort[] = [
  {
    title: SortTitle.price,
    mobileTitle: SortTitle.priceAsc,
    property: 'price',
    isAsc: true,
  },
  {
    title: SortTitle.price,
    mobileTitle: SortTitle.priceDesc,
    property: 'price',
    isAsc: false,
  },
  {
    title: SortTitle.rating,
    mobileTitle: SortTitle.raingAsc,
    property: 'rating',
    isAsc: true,
  },
  {
    title: SortTitle.rating,
    mobileTitle: SortTitle.ratingDesc,
    property: 'rating',
    isAsc: false,
  },
  {
    title: SortTitle.name,
    mobileTitle: SortTitle.nameAsc,
    property: 'name',
    isAsc: true,
  },
  {
    title: SortTitle.name,
    mobileTitle: SortTitle.nameDesc,
    property: 'name',
    isAsc: false,
  },
];

const SortList: FC = () => {

  const [isAsc, setIsAsc] = useState(false);
  const dispatch = useDispatch();

  const { sort } = useSelector(selectFilter); 
  const [currentSort, setCurrentSort] = useState<Sort>(sort);
  const sortListMobileRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const isMobileRef = useRef(false);
  const clazz = isAsc ? ' rotate' : '';

  const onChangeSort = (item: Sort) => {
    console.log(isMobileRef.current);
    if (!isMobileRef.current) {

      if (item.property !== sort.property) {
        setIsAsc(false);
      } else {
        setIsAsc(isAsc => !isAsc);
      }
    } else {
      setIsAsc(item.isAsc);
    }
  }

  useEffect(() => {
    if (!isMobileRef.current) {
      const mobileSortItem = mobileSortList.find(item =>
          item.property === currentSort.property && item.isAsc === isAsc);

      mobileSortItem &&
        dispatch(setSort({...currentSort, mobileTitle: mobileSortItem.mobileTitle, isAsc: isAsc}));
    } else {
      dispatch(setSort(currentSort));
    }
  }, [isAsc, currentSort]);

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
    isMobileRef.current = isMobile;
    setCurrentSort(item);

    onChangeSort(item);

    if (isMobile) {
      setIsShow(false);
    }
  }

  const sortItemsElements = sortList.map((item, index) => (
    <li
      onClick={() => onSelectItem(item, false)}
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
      onClick={() => onSelectItem(item, true)}
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