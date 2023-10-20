import React, { FC } from 'react';
import FilterItem from './FilterItem';
import { FilterName } from '../redux/filter/types';
import FilterPrice from './FilterPrice';

export type FilterListType = {
  title: string;
  propertyName: FilterName;
  values: string[];
  unit?: string;
}

const Filter: FC = () => {
  
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

  return (
    <div className="smartphones-filter">
      <h1 className="smartphones-filter__heading">Фильтры</h1>
      <FilterPrice />
      <FilterItem {...internalStorageList} />
      <FilterItem {...ramList} />
      <FilterItem {...brandList} />
      <FilterItem {...screenTypeList} />
    </div>
  );
}

export default Filter