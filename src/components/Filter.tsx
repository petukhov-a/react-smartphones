import React, { FC } from 'react';
import FilterItem from './FilterItem';
import drodDownArrow from '../assets/img/arrow.svg';
import { FilterName } from '../redux/filter/types';

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
    values: ['DOOGEE', 'Apple', 'ITEL', 'Realme', 'Samsung', 'Xiaomi', 'TECNO']
  };

  const screenTypeList: FilterListType = {
    title: 'Тип экрана',
    propertyName: 'screenType',
    values: ['OLED', 'IPS', 'AMOLED']
  };

  return (
    <div className="smartphones-filter">
      <h1 className="smartphones-filter__heading">Фильтры</h1>
      <details className="smartphones-filter-item" open>
        <summary className="smartphones-filter-item__heading">
          <span>Цена</span>
          <img className="drop-down-arrow" src={drodDownArrow} alt="drop-down-arrow" />
        </summary>
        <div className="price-inputs">
          <input type="number" className="checkbox-input" value="2490" />
          <span>–</span>
          <input type="number" className="checkbox-input" value="199990" />
        </div>
      </details>
      <FilterItem {...internalStorageList} />
      <FilterItem {...ramList} />
      <FilterItem {...brandList} />
      <FilterItem {...screenTypeList} />
    </div>
  );
}

export default Filter