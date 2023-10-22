import { FC, useEffect, useState } from 'react';
import drodDownArrow from '../assets/img/arrow.svg';
import { useDispatch } from 'react-redux';
import { removeFilterValue, setFilterValue } from '../redux/filter/slice';
import { FilterInfo } from './Filter';

type FilterItemProps = {
  filterInfo: FilterInfo;
  isCleared: boolean;
}

const FilterItem: FC<FilterItemProps> = ({ filterInfo, isCleared } ) => {
  const { title, values, unit, propertyName } = filterInfo;
  const dispatch = useDispatch();
  const [checkedList, setCheckedList] = useState<number[]>([]);

  useEffect(() => {
    if (isCleared) {
      setCheckedList([]);
    }
  }, [isCleared]);

  const onInputClick = (index: number) => {
    const filterValue = values[index];

    if (!checkedList.includes(index)) {
      setCheckedList(checkedList => [...checkedList, index]);
      dispatch(setFilterValue({ propertyName, filterValue }));
    } else {
      setCheckedList(checkedList => checkedList.filter(item => item !== index));
      dispatch(removeFilterValue({ propertyName, filterValue }));
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
          <li key={index}>
            <label>
              <input
                name={title}
                type="checkbox"
                checked={checkedList.includes(index)}
                onChange={() => onInputClick(index)}
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
