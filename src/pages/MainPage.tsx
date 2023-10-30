import { FC, useEffect, useRef, useState } from "react";
import SmartphoneCard from "../components/SmartphoneCard";
import Filter from "../components/Filter";
import { FilterName, Sort } from "../redux/filter/types";
import { selectFilter } from "../redux/filter/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectSmartphones } from "../redux/smartphones/selectors";
import { setSmartphones } from "../redux/smartphones/slice";
import { Smartphone } from "../redux/smartphones/types";
import { FilterSliceState } from "../redux/filter/types";
import { setFilters, setPriceFilterValue, setSort } from "../redux/filter/slice";
import isEqual from 'lodash.isequal';
import { useNavigate } from "react-router-dom";
import qs from "qs";
import SortList, { mobileSortList, SortTitle } from "../components/SortList";

const MainPage: FC = () => {

  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Smartphone[]>([]);
  const { sort } = useSelector(selectFilter);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const [clazz, setClazz] = useState('');
  const isMountedNavigate = useRef(false);
  const isMountedMobileFilter = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterValues = useSelector(selectFilter);
  const order = isAsc ? 'asc' : 'desc';
  // const [order, setOrder] = useState(isAsc ? 'asc' : 'desc');
  const { items } = useSelector(selectSmartphones);
  const prevFiltersRef = useRef<FilterSliceState>();

  const url = `https://64de3b97825d19d9bfb254c6.mockapi.io/items?sortBy=${sort.property}&order=${order}`;

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
    fetchItems(url);
  }, [sort, order]);


  useEffect(() => {
    if (isMountedNavigate.current) {
      if (!isEqual(filterValues, prevFiltersRef.current)) {
        let queryString = qs.stringify(filterValues);

        if (filterValues.searchValue === '') {
          queryString = queryString.replace('&searchValue=', '');
        }
  
        navigate(`?${queryString}`);
      }
      prevFiltersRef.current = filterValues;
    }

    isMountedNavigate.current = true;
  }, [filterValues]);

    useEffect(() => {
    if (isMountedMobileFilter.current) {
      setClazz(isShowFilter ? ' shown' : ' hidden');
    }

    isMountedMobileFilter.current = true;

  }, [isShowFilter]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown;
      const filters = params as FilterSliceState;

      dispatch(setFilters(filters));
    }
  }, []);

  const onChangeSort = (sortParams: Sort, isMobile: boolean, index: number) => {
    if (!isMobile) {

      if (sort.property !== sortParams.property) {
        setIsAsc(false);
      } else {
        setIsAsc(isAsc => !isAsc);
      }

      const mobileSortItems = mobileSortList.filter(item => 
        item.property === sortParams.property
      );

      if (!isAsc) {
        const mobileSortItem = mobileSortItems.find(item => item.isAsc);
        mobileSortItem && 
          dispatch(setSort({...sortParams, mobileTitle: mobileSortItem.mobileTitle, isAsc: true}));
      } else {
        const mobileSortItem = mobileSortItems.find(item => !item.isAsc);
        mobileSortItem &&
          dispatch(setSort({...sortParams, mobileTitle: mobileSortItem.mobileTitle, isAsc: false}));
      }
    }

    if (isMobile) {
      setIsAsc(sortParams.isAsc ? true : false);
      dispatch(setSort(sortParams));
    }
  }

  const isFilterCheckboxExist = (filterName: FilterName | 'prices') => {
    if (filterName !== 'prices') {

      const filterValue = filterValues[filterName];
      if (Array.isArray(filterValue)) {
        if (filterValue.length !== 0) {
          return true;
        }
      }

    }
  }

  const isMatchFilters = (item: Smartphone) => {
    if (!isMatchCheckboxFilters(item)) {
      return false;
    }

    if (!isMatchPriceFilter(item)) {
      return false;
    }

    if (!isMatchSearch(item)) {
      return false;
    }

    return true;
  }

  const isMatchSearch = (item: Smartphone) => {
    if (filterValues.searchValue !== '') {
      const itemName = item.name.toLowerCase();
      const searchValue = filterValues.searchValue.toLowerCase();
      if (itemName.includes(searchValue)) {
        return true;
      }
      return false;
    }
    return true;
  }

  const isMatchCheckboxFilters = (item: Smartphone) => {
    for (let key in filterValues) {
      const filterKey = key as FilterName;
      if (isFilterCheckboxExist(filterKey)) {
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
    if (!isEqual(filterValues, prevFiltersRef)) {
      const newItems = items.filter(item => isMatchFilters(item));

      setFilteredItems(newItems);
  
      if (filterValues.prices.toString() === `0,0`) {
        setMinMaxPrice(items);
      }
    }
    prevFiltersRef.current = filterValues;
  }, [filterValues, items]);

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
          <SortList onChangeSort={onChangeSort} isAsc={isAsc} />
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