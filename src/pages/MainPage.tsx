import { FC } from "react";
import Sort from "../components/Sort";

import React from 'react'
import SmartphoneCard from "../components/SmartphoneCard";
import Filter from "../components/Filter";

const MainPage: FC = () => {
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
            <SmartphoneCard />
            <SmartphoneCard />
            <SmartphoneCard />
            <SmartphoneCard />
          </div>
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default MainPage;