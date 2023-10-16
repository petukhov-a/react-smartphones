import React from 'react';
import FilterItem from './FilterItem';
import drodDownArrow from '../assets/img/arrow.svg';

const Filter = () => {
  const internalStorageList = ['64', '128', '256'];
  const ramList = ['2', '4', '6', '8', '10', '12'];
  const brandList = ['DOOGEE', 'Apple', 'ITEL', 'Realme', 'Samsung', 'Xiaomi', 'TECNO'];
  const screenTypeList = ['OLED', 'IPS', 'AMOLED'];

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
      <FilterItem name='Встроенная память' valueList={internalStorageList} unit='ГБ' />
      <FilterItem name='Оперативная память' valueList={ramList} unit='ГБ'/>
      <FilterItem name='Бренд' valueList={brandList}/>
      <FilterItem name='Тип экрана' valueList={screenTypeList}/>
    </div>
  );
}

export default Filter