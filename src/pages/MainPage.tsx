import { FC, useEffect, useRef, useState } from 'react';
import SmartphoneCard from '../components/SmartphoneCard';
import Filter, { isMatchFilters } from '../components/Filter';
import { Sort } from '../redux/filter/types';
import { selectFilter } from '../redux/filter/selectors';
import { useSelector } from 'react-redux';
import { selectSmartphones } from '../redux/smartphones/selectors';
import { Smartphone } from '../redux/smartphones/types';
import { FilterSliceState } from '../redux/filter/types';
import { setFilters, setPriceFilterValue } from '../redux/filter/slice';
import isEqual from 'lodash.isequal';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import SortList from '../components/SortList';
import { productsString } from '../utils/formatProductsString';
import { sortItems } from '../utils/sortItems';
import { setMainSort } from '../redux/filter/slice';
import Skeleton from '../components/SmartphoneCard/Skeleton';
import { fetchSmartphones } from '../redux/smartphones/asyncActions';
import { useAppDispatch } from '../redux/store';
import Pagination from '../components/Pagination';
import { selectPagination } from '../redux/pagination/selectors';
import { setPageCount } from '../redux/pagination/slice';
import clsx from 'clsx';

const sortList: Sort[] = [
  { title: 'по цене', property: 'price', isAsc: false },
  { title: 'по рейтингу', property: 'rating', isAsc: false },
  { title: 'по названию', property: 'name', isAsc: false },
];

const mobileSortList: Sort[] = [
  { mobileTitle: 'по возрастанию цены', property: 'price', isAsc: true },
  { mobileTitle: 'по убыванию цены', property: 'price', isAsc: false },
  { mobileTitle: 'по возрастанию рейтинга', property: 'rating', isAsc: true },
  { mobileTitle: 'по убыванию рейтинга', property: 'rating', isAsc: false },
  { mobileTitle: 'по названию (от А до Я)', property: 'name', isAsc: true },
  { mobileTitle: 'по названию (от Я до А)', property: 'name', isAsc: false },
];

const MainPage: FC = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Smartphone[]>([]);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mainSort } = useSelector(selectFilter);

  const filterValues = useSelector(selectFilter);
  const { items, status } = useSelector(selectSmartphones);
  const prevFiltersRef = useRef<FilterSliceState>();

  const { currentPage, itemsPerPage } = useSelector(selectPagination);

  const setMinMaxPrice = (items: Smartphone[]) => {
    const minPrice = Math.min(...items.map((item) => item.price));
    const maxPrice = Math.max(...items.map((item) => item.price));

    if (isFinite(minPrice) && isFinite(maxPrice)) {
      dispatch(setPriceFilterValue([minPrice, maxPrice]));
    }
  };

  useEffect(() => {
    dispatch(
      fetchSmartphones()
    );
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (!isEqual(filterValues, prevFiltersRef.current)) {
        let queryString = qs.stringify(filterValues);

        if (filterValues.searchValue === '') {
          queryString = queryString.replace('&searchValue=', '');
        }

        navigate(`?${queryString}`);
      }
      prevFiltersRef.current = filterValues;
    }

    isMounted.current = true;
  }, [filterValues]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterValues, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown;
      const filters = params as FilterSliceState;

      filters.mainSort.isAsc = filters.mainSort.isAsc === true;
      filters.favoritesSort.isAsc = filters.favoritesSort.isAsc === true;

      dispatch(setFilters(filters));
    }
  }, []);

  useEffect(() => {
    if (!isEqual(filterValues, prevFiltersRef)) {
      const newItems = items.filter((item) => isMatchFilters(item, filterValues));

      sortItems(newItems, filterValues.mainSort.isAsc, mainSort.property);

      const pageCount = Math.ceil(newItems.length / itemsPerPage);
      dispatch(setPageCount(pageCount));

      setFilteredItems(newItems);

      if (filterValues.prices.toString() === `0,0`) {
        setMinMaxPrice(items);
      }
    }
    prevFiltersRef.current = filterValues;
  }, [filterValues, items, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const smartphones = filteredItems
    .slice(startIndex, endIndex)
    .map((item: Smartphone) => (
      <SmartphoneCard item={item} key={item.id} />
    ));

  return (
    <>
      <div className={clsx("smartphones", isShowFilter && 'no-hover')}>
        <div className="container">
          <div className="smartphones-header">
            <div className="smartphones-header-heading">
              <h3 className="smartphones-header__title">Смартфоны</h3>
              <span className="smartphones-header__count">
                {filteredItems.length + ' ' + productsString(filteredItems.length)}
              </span>
            </div>
            <button
              className="smartphones-header__mobile-filter-btn"
              ref={filterBtnRef}
              onClick={() => setIsShowFilter(true)}>
              Фильтры
            </button>
          </div>
          <SortList
            sortList={sortList}
            mobileSortList={mobileSortList}
            sortData={mainSort}
            setSort={setMainSort}
          />
          <div className="smartphones-content">
            {status === 'error' ? (
              <div className="smartphones-content__error-info">
                <h2>Произошла ошибка! 😕</h2>
                <p>Не удалось загрузить смартфоны. Попробуйте повторить запрос позже</p>
              </div>
            ) : (
              <div className="smartphones-content-cards">
                {status === 'loading' ? skeletons : smartphones}
              </div>
            )}
            <Filter isShow={isShowFilter} setIsShow={setIsShowFilter} filterBtnRef={filterBtnRef} />
          </div>
          <Pagination />
        </div>
      </div>
      <div className={clsx('overlay', isShowFilter && 'shown')}></div>
    </>
  );
};

export default MainPage;