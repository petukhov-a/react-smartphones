import React, {MouseEvent, FC, useState, useRef } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';

type SortProps = {
  onChangeSort: (i: number) => void;
  isAsc: boolean;
  sortType: number;
}

export const sortList = [
  {name: "по цене", sortProperty: "price"},
  {name: "по рейтингу", sortProperty: "rating"},
  {name: "по названию", sortProperty: "name"},
];

const Sort: FC<SortProps> = ({onChangeSort, isAsc, sortType}) => {

  const clazz = isAsc ? ' rotate' : '';

  const sortItemsElements = sortList.map((item, index) => (
    <li
      onClick={() => onChangeSort(index)}
      className={sortType === index ? 'active' : ''}
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
      <div className="sort-list-mobile">
        <button className="sort-list-mobile-btn">
          <span>по рейтингу</span>
          <img src={dropDownArrow} alt="" />
        </button>
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