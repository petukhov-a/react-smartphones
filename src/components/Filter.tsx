import { FC, useEffect, useRef, useState } from 'react';
import FilterItem from './FilterItem';
import { FilterName, FilterSliceState } from '../redux/filter/types';
import FilterPrice from './FilterPrice';
import { clearFilters } from '../redux/filter/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { handleOutsideClick } from '../utils/handleOutsideClick';
import { Smartphone } from '../redux/smartphones/types';

export type FilterInfo = {
  title: string;
  propertyName: FilterName;
  values: string[];
  unit?: string;
}

export const isFilterCheckboxExist = (filterName: FilterName | 'prices', filterValues: FilterSliceState) => {
  if (filterName !== 'prices') {
    const filterValue = filterValues[filterName];
    if (Array.isArray(filterValue)) {
      if (filterValue.length !== 0) {
        return true;
      }
    }
  }
};

export const isMatchSearch = (item: Smartphone, filterValues: FilterSliceState) => {
  if (filterValues.searchValue !== '') {
    const itemName = item.name.toLowerCase();
    const searchValue = filterValues.searchValue.toLowerCase();
    if (itemName.includes(searchValue)) {
      return true;
    }
    return false;
  }
  return true;
};

export const isMatchCheckboxFilters = (item: Smartphone, filterValues: FilterSliceState) => {
  for (let key in filterValues) {
    const filterKey = key as FilterName;
    if (isFilterCheckboxExist(filterKey, filterValues)) {
      const matchingValue = String(item[filterKey]);
      const isMatchFilter = filterValues[filterKey].includes(matchingValue);
      if (!isMatchFilter) {
        return false;
      }
    }
  }

  return true;
};

export const isMatchPriceFilter = (item: Smartphone, filterValues: FilterSliceState) => {
  if (item.price >= filterValues.prices[0] && item.price <= filterValues.prices[1]) {
    return true;
  }
  return false;
};

export const isMatchFilters = (item: Smartphone, filterValues: FilterSliceState) => {
  if (!isMatchCheckboxFilters(item, filterValues)) {
    return false;
  }

  if (!isMatchPriceFilter(item, filterValues)) {
    return false;
  }

  if (!isMatchSearch(item, filterValues)) {
    return false;
  }

  return true;
};

type FilterProps = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  filterBtnRef: React.RefObject<HTMLButtonElement>;
}

const Filter: FC<FilterProps> = ( {isShow, setIsShow, filterBtnRef} ) => {
  const dispatch = useDispatch();
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const filterValues = useSelector(selectFilter);
  const filterRef = useRef<HTMLDivElement>(null);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    setIsCleared(false);
  }, [filterValues]);

  const filtersList: FilterInfo[] = [
    {
      title: 'Встроенная память',
      propertyName: 'internalStorage',
      values: ['64', '128', '256'],
      unit: 'ГБ',
    },
    {
      title: 'Оперативная память',
      propertyName: 'ram',
      values: ['2', '4', '6', '8', '10', '12'],
      unit: 'ГБ',
    },
    {
      title: 'Бренд',
      propertyName: 'brand',
      values: ['DOOGEE', 'Apple', 'ITEL', 'REALME', 'Samsung', 'Xiaomi', 'TECNO']
    },
    {
      title: 'Тип экрана',
      propertyName: 'screenType',
      values: ['OLED', 'IPS', 'AMOLED']
    }
  ]

  useEffect(() => {
    isShow ? blockScroll() : allowScroll();
  }, [isShow]);

  useEffect(() => {
    const filter = filterRef.current;
    const btn = filterBtnRef.current;

    document.body.addEventListener('click', (e) => handleOutsideClick(e, setIsShow, filter, btn));

    return () => document.body.removeEventListener('click', (e) => handleOutsideClick(e, setIsShow, filter, btn));
  }, []);

  const onClickClear = () => {
    dispatch(clearFilters());
    setIsCleared(true);
  };

  const filters = filtersList.map((item, index) => <FilterItem filterInfo={item} key={index} isCleared={isCleared} />);

  const clazz = isShow ? ' active' : '';

  return (
    <div className={"smartphones-filter" + clazz} ref={filterRef}>
      <div className="smartphones-filter-header">
        <h1 className="smartphones-filter__heading">Фильтры</h1>
        <button className="smartphones-filter__clear-btn" onClick={onClickClear}>Очистить</button>
      </div>
      <FilterPrice />
      {filters}
    </div>
  );
}

export default Filter