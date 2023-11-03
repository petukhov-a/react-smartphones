import {FC, useState, useRef, useEffect } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { handleOutsideClick } from '../utils/handleOutsideClick';
import { Sort } from '../redux/filter/types';
import { AnyAction } from '@reduxjs/toolkit';

type SortListProps = {
  sortList: Sort[];
  mobileSortList: Sort[];
  sortData: Sort;
  setSort: (sort: Sort) => AnyAction;
}

const SortList: FC<SortListProps> = ( {sortList, mobileSortList, sortData, setSort} ) => {

  const [isAsc, setIsAsc] = useState(false);
  const dispatch = useDispatch();

  const { mainSort } = useSelector(selectFilter); 
  const [currentSort, setCurrentSort] = useState<Sort>(sortData);
  const sortListMobileRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const isMobileRef = useRef(false);
  const clazz = isAsc ? ' rotate' : '';

  const onChangeSort = (item: Sort) => {
    if (!isMobileRef.current) {

      if (item.property !== sortData.property) {
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
      className={item.property === sortData.property ? 'active' : ''}
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
      className={item.property === sortData.property ? 'active': ''}>
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
            {sortData.mobileTitle}
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