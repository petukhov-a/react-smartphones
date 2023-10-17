import { FC, useCallback, useEffect, useState } from "react";
import Sort, { sortList } from "../components/Sort";

import React from 'react'
import SmartphoneCard from "../components/SmartphoneCard";
import Filter from "../components/Filter";
import { selectFilter } from "../redux/filter/selectors";
import { useSelector } from "react-redux";

const MainPage: FC = () => {
  const [items, setItems] = useState([]);
  const [sortType, setSortType] = useState(0);
  const [isAsc, setIsAsc] = useState(false);
  const order = isAsc ? 'asc' : 'desc';
  const sortTypeName = sortList[sortType].sortProperty;

  const { internalStorage, ram, brand, screenType } = useSelector(selectFilter);

  const storageFilter = internalStorage ? `&internalStorage=${internalStorage}` : '';
  const ramFilter = ram ? `&ram=${ram}` : '';
  const brandFilter = brand ? `&brand=${brand}` : '';

  const url = `https://64de3b97825d19d9bfb254c6.mockapi.io/items?sortBy=${sortTypeName}&order=${order}${storageFilter}${ramFilter}${brandFilter}`;

  const fetchItems = (url: string) => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setItems(res);
    });
  }

  useEffect(() => {
    fetchItems(url);
    console.log(url);
  }, [order, sortTypeName, internalStorage, ram, brand]);

  const onChangeSort = (index: number) => {
    if (sortType !== index) {
      setIsAsc(false);
    } else {
      setIsAsc(isAsc => !isAsc);
    }
    setSortType(index);
  }

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
       <Sort onChangeSort={onChangeSort} isAsc={isAsc} sortType={sortType} />
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