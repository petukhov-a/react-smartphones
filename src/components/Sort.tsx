import React, { FC } from 'react'

const Sort: FC = () => {
  return (
    <div className="sort">
      <div className="sort-list">
        <ul>
          <li>по популярности</li>
          <li>по цене</li>
          <li>по рейтингу</li>
          <li>по отзывам</li>
          <li>по названию</li>
        </ul>
      </div>
      <div className="sort-list-mobile">
        <button className="sort-list-mobile-btn">
          <span>по популярности</span>
          <img src="./../img/arrow.svg" alt="" />
        </button>
        <ul>
          <li>по популярности</li>
          <li>по возрастанию цены</li>
          <li>по убыванию цены</li>
          <li>по рейтингу</li>
          <li>по отзывам</li>
          <li>по названию (от А до Я)</li>
          <li>по названию (от Я до А)</li>
        </ul>
      </div>
    </div>
  );
}

export default Sort;