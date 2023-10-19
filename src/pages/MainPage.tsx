import { FC, useCallback, useEffect, useRef, useState } from "react";
import Sort, { sortList } from "../components/Sort";

import React from 'react'
import SmartphoneCard from "../components/SmartphoneCard";
import Filter from "../components/Filter";
import { FilterName } from "../redux/filter/types";
import { selectFilter } from "../redux/filter/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectSmartphones } from "../redux/smartphones/selectors";
import { setSmartphones } from "../redux/smartphones/slice";
import { Smartphone } from "../redux/smartphones/types";
import { FilterSliceState } from "../redux/filter/types";

const MainPage: FC = () => {

  const [sortType, setSortType] = useState(0);
  const [isAsc, setIsAsc] = useState(false);
  const order = isAsc ? 'asc' : 'desc';
  const [filteredItems, setFilteredItems] = useState<Smartphone[]>([]);
  const sortTypeName = sortList[sortType].sortProperty;
  const dispatch = useDispatch();

  const filterValues: FilterSliceState = { ...useSelector(selectFilter) };
  const { items } = useSelector(selectSmartphones);

  const storageFilter = filterValues.internalStorage ? `&internalStorage=${filterValues.internalStorage}` : '';
  const ramFilter = filterValues.ram ? `&ram=${filterValues.ram}` : '';
  const brandFilter = filterValues.brand ? `&brand=${filterValues.brand}` : '';
  const search = filterValues.searchValue ? `&name=${filterValues.searchValue}` : '';

  const url = `https://64de3b97825d19d9bfb254c6.mockapi.io/items?sortBy=${sortTypeName}&order=${order}`;

  const fetchItems = (url: string) => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch(setSmartphones(res));
      })
  }

  useEffect(() => {
    fetchItems(url);
  }, [order, sortTypeName, filterValues.internalStorage, filterValues.ram, filterValues.brand, filterValues.searchValue]);

  const onChangeSort = (index: number) => {
    if (sortType !== index) {
      setIsAsc(false);
    } else {
      setIsAsc(isAsc => !isAsc);
    }
    setSortType(index);
  }

  const isFilterValueExist = (filterName: FilterName) => {
    return filterValues[filterName].length !== 0;
  }

  const isFilterValuesExist = () => {
    for (let key in filterValues) {
      const filterKey = key as FilterName;
      if (isFilterValueExist(filterKey)) {
        return true;
      }
    }
    return false;
  }

  const isMatchFilters = (item: Smartphone) => {
    for (let key in filterValues) {
      const filterKey = key as FilterName;
      if (isFilterValueExist(filterKey)) {
        const matchingItem = String(item[filterKey]);
        const isMatchFilter = filterValues[filterKey].includes(matchingItem);
        if (!isMatchFilter) {
          return false;
         }
      }
    }
    return true;
  }

  useEffect(() => {
    const newItems = items.filter(item => isMatchFilters(item));

    if (!isFilterValuesExist()) {
      setFilteredItems(items)
    } else {
      setFilteredItems(newItems);
    }

  }, [filterValues.internalStorage, filterValues.ram, filterValues.brand, filterValues.screenType, items])

  const smartphones = filteredItems.map((item: Smartphone) => <SmartphoneCard {...item} key={item.id} />);

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