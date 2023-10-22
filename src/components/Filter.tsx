import { FC, useEffect, useState } from 'react';
import FilterItem from './FilterItem';
import { FilterName } from '../redux/filter/types';
import FilterPrice from './FilterPrice';
import { clearFilters } from '../redux/filter/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';

export type FilterInfo = {
  title: string;
  propertyName: FilterName;
  values: string[];
  unit?: string;
}

const Filter: FC = () => {
  const dispatch = useDispatch();
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const filterValues = useSelector(selectFilter);

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

  const onClickClear = () => {
    dispatch(clearFilters());
    setIsCleared(true);
  }

  const filters = filtersList.map((item, index) => <FilterItem filterInfo={item} key={index} isCleared={isCleared} />);

  return (
    <div className="smartphones-filter">
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