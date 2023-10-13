import { FC, useCallback, useEffect, useState } from "react";
import Sort from "../components/Sort";

import React from 'react'
import SmartphoneCard from "../components/SmartphoneCard";
import Filter from "../components/Filter";

const MainPage: FC = () => {
  const [items, setItems] = useState([]);
  const url = 'https://run.mocky.io/v3/b86238c8-87c1-45a3-9491-14d603534a34';

  const fetchItems = (url: string) => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setItems(res);
    });
  }

  useEffect(() => {
    fetchItems(url);
  }, []);

  const smartphones = items.map((item: any) => <SmartphoneCard {...item} key={item.id} />);

  return (
    <div className="smartphones">
      <div className="container">
        <div className="smartphones-header">
          <div className="smartphones-header-heading">
            <h3 className="smartphones-header__title">Смартфоны</h3>
            <span className="smartphones-header__count">10 товаров</span>
          </div>
          <button className="smartphones-header__mobile-filter-btn">Фильтры</button>
        </div>
       <Sort />
        <div className="smartphones-content">
          <div className="smartphones-content-cards">
            {smartphones}
          </div>
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default MainPage;