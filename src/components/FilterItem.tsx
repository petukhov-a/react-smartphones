import { FC, useEffect, useState } from 'react';
import drodDownArrow from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setInternalStorage, setRam, setBrand, setScreenType } from '../redux/filter/slice';
import { FilterListType } from './Filter';

const filterTypeSetting = {
  internalStorage: setInternalStorage,
  ram: setRam,
  brand: setBrand,
  screenType: setScreenType,
};

const FilterItem: FC<FilterListType> = ({ title, values, unit, propertyName }) => {
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const dispatch = useDispatch();

  const onInputClick = (index: number) => {
    const setFilterValue = filterTypeSetting[propertyName];

    if (index === checkedIndex) {
      dispatch(setFilterValue(''));
      setCheckedIndex(-1);
    } else {
      const filterValue = values[index];
      dispatch(setFilterValue(filterValue));
      setCheckedIndex(index);
    }
  };

  return (
    <details className="smartphones-filter-item" open>
      <summary className="smartphones-filter-item__heading">
        <span>{title}</span>
        <img className="drop-down-arrow" src={drodDownArrow} alt="drop-down-arrow" />
      </summary>
      <ul className="smartphones-filter-item-list">
        {values.map((item, index) => (
          <li>
            <label>
              <input
                name={title}
                type="checkbox"
                checked={index === checkedIndex}
                onClick={() => onInputClick(index)}
              />
              {unit ? item + ' ' + unit : item}
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default FilterItem;
