import { FC, useEffect, useRef, useState } from 'react';
import FilterItem from './FilterItem';
import { FilterName } from '../redux/filter/types';
import FilterPrice from './FilterPrice';
import { clearFilters } from '../redux/filter/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { useScrollBlock } from '../hooks/useScrollBlock';

export type FilterInfo = {
  title: string;
  propertyName: FilterName;
  values: string[];
  unit?: string;
}

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
    const hadndleOutsideClick = (event: MouseEvent) => {
      if (filterRef.current && filterBtnRef.current && 
        !event.composedPath().includes(filterRef.current) &&
        !event.composedPath().includes(filterBtnRef.current)) {
        setIsShow(false);
      }

    }

    document.body.addEventListener('click', hadndleOutsideClick);

    return () => document.body.removeEventListener('click', hadndleOutsideClick);
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