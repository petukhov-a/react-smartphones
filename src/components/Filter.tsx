import React, { FC, useState } from 'react';
import FilterItem from './FilterItem';
import { FilterName } from '../redux/filter/types';
import FilterPrice from './FilterPrice';
import { clearFilters } from '../redux/filter/slice';
import { useDispatch } from 'react-redux';

export type FilterListType = {
  title: string;
  propertyName: FilterName;
  values: string[];
  unit?: string;
}

const Filter: FC = () => {

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(null);
  
  const internalStorageList: FilterListType = {
    title: 'Встроенная память',
    propertyName: 'internalStorage',
    values: ['64', '128', '256'],
    unit: 'ГБ',
  };

  const ramList: FilterListType = {
    title: 'Оперативная память',
    propertyName: 'ram',
    values: ['2', '4', '6', '8', '10', '12'],
    unit: 'ГБ',
  };

  const brandList: FilterListType = {
    title: 'Бренд',
    propertyName: 'brand',
    values: ['DOOGEE', 'Apple', 'ITEL', 'REALME', 'Samsung', 'Xiaomi', 'TECNO']
  };

  const screenTypeList: FilterListType = {
    title: 'Тип экрана',
    propertyName: 'screenType',
    values: ['OLED', 'IPS', 'AMOLED']
  };

  const onClickClear = () => {
    dispatch(clearFilters());
  }

  return (
    <div className="smartphones-filter">
      <div className="smartphones-filter-header">
        <h1 className="smartphones-filter__heading">Фильтры</h1>
        <button className="smartphones-filter__clear-btn" onClick={onClickClear}>Очистить</button>
      </div>
      <FilterPrice />
      <FilterItem {...internalStorageList} />
      <FilterItem {...ramList} />
      <FilterItem {...brandList} />
      <FilterItem {...screenTypeList} />
    </div>
  );
}

export default Filter