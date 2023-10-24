import { FC, useEffect, useRef, useState } from "react";
import Sort, { sortList } from "../components/Sort";
import SmartphoneCard from "../components/SmartphoneCard";
import Filter from "../components/Filter";
import { FilterName } from "../redux/filter/types";
import { selectFilter } from "../redux/filter/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectSmartphones } from "../redux/smartphones/selectors";
import { setSmartphones } from "../redux/smartphones/slice";
import { Smartphone } from "../redux/smartphones/types";
import { FilterSliceState } from "../redux/filter/types";
import { setPriceFilterValue } from "../redux/filter/slice";
import isEqual from 'lodash.isequal';

const MainPage: FC = () => {

  const [sortType, setSortType] = useState(0);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const order = isAsc ? 'asc' : 'desc';
  const [filteredItems, setFilteredItems] = useState<Smartphone[]>([]);
  const sortTypeName = sortList[sortType].sortProperty;
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const [clazz, setClazz] = useState('');
  const isMounted = useRef(false);
  const dispatch = useDispatch();

  const filterValues = useSelector(selectFilter);
  const { items } = useSelector(selectSmartphones);
  const prevFiltersRef = useRef<FilterSliceState>();

  const search = filterValues.searchValue ? `&name=${filterValues.searchValue}` : '';

  const url = `https://64de3b97825d19d9bfb254c6.mockapi.io/items?sortBy=${sortTypeName}&order=${order}${search}`;

  const fetchItems = (url: string) => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch(setSmartphones(res));
      });
  }

  const setMinMaxPrice = (items: Smartphone[]) => {
    const minPrice = Math.min(...items.map(item => item.price));
    const maxPrice = Math.max(...items.map(item => item.price));

    if (isFinite(minPrice) && isFinite(maxPrice)) {
      dispatch(setPriceFilterValue([minPrice, maxPrice]));
    }
  }

  useEffect(() => {
    if (!isEqual(filterValues, prevFiltersRef.current)) {
      fetchItems(url);
    }
  }, [filterValues]);

  useEffect(() => {
    fetchItems(url);
  }, [order, sortTypeName]);

  const onChangeSort = (index: number) => {
    if (sortType !== index) {
      setIsAsc(false);
    } else {
      setIsAsc(isAsc => !isAsc);
    }
    setSortType(index);
  }

  const isFilterValueExist = (filterName: FilterName | 'searchValue' | 'prices') => {
    if (filterName !== 'searchValue' &&
        filterValues[filterName].length !== 0 &&
        filterName !== 'prices') {
      return true;
    }
  }

  const isMatchFilters = (item: Smartphone) => {
    if (!isMatchCheckboxFilters(item)) {
      return false;
    }

    if (!isMatchPriceFilter(item)) {
      return false;
    }

    return true;
  }

  const isMatchCheckboxFilters = (item: Smartphone) => {
    for (let key in filterValues) {
      const filterKey = key as FilterName;
      if (isFilterValueExist(filterKey)) {
        const matchingValue = String(item[filterKey]);
        const isMatchFilter = filterValues[filterKey].includes(matchingValue);
        if (!isMatchFilter) {
          return false;
         }
      }
    }

    return true;
  }

  const isMatchPriceFilter = (item: Smartphone) => {
    if (item.price >= filterValues.prices[0] &&
        item.price <= filterValues.prices[1]) {
          return true;
    }
    return false;
  }

  useEffect(() => {
    const newItems = items.filter(item => isMatchFilters(item));

    setFilteredItems(newItems);

    if (filterValues.prices.toString() === `0,0`) {
      setMinMaxPrice(items);
    }

    prevFiltersRef.current = filterValues;
  }, [items]);

  const smartphones = filteredItems.map((item: Smartphone) => <SmartphoneCard {...item} key={item.id} />);

  const productsString = (items: Smartphone[]) => {
    const lastDigit = Number(items.length) % 10;
      
    if (lastDigit === 1) {
      return 'товар';
    }
    if (lastDigit > 1 && lastDigit < 5) {
      return 'товара';
    }
    return 'товаров';
  }

  useEffect(() => {
    if (isMounted.current) {
      setClazz(isShowFilter ? ' shown' : ' hidden');
    }
    isMounted.current = true;
  }, [isShowFilter]);

  return (
    <>
      <div className="smartphones">
        <div className="container">
          <div className="smartphones-header">
            <div className="smartphones-header-heading">
              <h3 className="smartphones-header__title">Смартфоны</h3>
              <span className="smartphones-header__count">
                {filteredItems.length + ' ' + productsString(filteredItems)}
              </span>
            </div>
            <button
              className="smartphones-header__mobile-filter-btn"
              ref={filterBtnRef}
              onClick={() => setIsShowFilter(true)}>
              Фильтры
            </button>
          </div>
          <Sort onChangeSort={onChangeSort} isAsc={isAsc} sortType={sortType} />
          <div className="smartphones-content">
            <div className="smartphones-content-cards">{smartphones}</div>
            <Filter isShow={isShowFilter} setIsShow={setIsShowFilter} filterBtnRef={filterBtnRef} />
          </div>
        </div>
      </div>
      <div className={"overlay" + clazz}></div>
    </>
  );
}

export default MainPage;