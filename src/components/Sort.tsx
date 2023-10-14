import React, {MouseEvent, FC, useState } from 'react';
import dropDownArrow from '../assets/img/arrow.svg';
import sortDescending from '../assets/img/sort-descending.svg';

const Sort: FC = () => {
  const [sortType, setSortType] = useState(0);

  const onChange = (sortType: number) => {
    setSortType(sortType);
  }

  const sortList = ["по цене", "по рейтингу", "по названию"]

  return (
    <div className="sort">
      <div className="sort-list">
        <ul>
          {sortList.map((item, index) => (
            <li
              onClick={() => onChange(index)}
              className={sortType === index ? 'active' : ''}>
                {item}
                <img className='sort-order-img' src={sortDescending} />
            </li>
          ))}
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