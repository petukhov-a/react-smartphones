import { FC, useEffect, useState } from 'react';
import drodDownArrow from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { removeFilterValue, setFilterValue } from '../redux/filter/slice';
import { FilterInfo } from './Filter';
import { selectFilter } from '../redux/filter/selectors';
import clsx from 'clsx';

type FilterItemProps = {
  filterInfo: FilterInfo;
  isCleared: boolean;
}

const FilterItem: FC<FilterItemProps> = ({ filterInfo, isCleared } ) => {
  const { title, values, unit, propertyName } = filterInfo;
  const dispatch = useDispatch();
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const filterValues = useSelector(selectFilter);
  const [ isActive, setIsActive ] = useState(true);

  const onFilterClick = () => {
    setIsActive(isActive => !isActive);
  }

  useEffect(() => {
    if (isCleared) {
      setCheckedList([]);
    }
  }, [isCleared]);

  useEffect(() => {
    const filterValue = filterValues[propertyName];
    if (filterValue.length !== 0) {
      values.forEach((value, index) => {
        if (filterValue.includes(value)) {
          setCheckedList(checkedList => [...checkedList, index]);
        } else {
          setCheckedList(checkedList => checkedList.filter(item => item !== index));
        }
      });
    }
  }, [filterValues]);

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
    <details className="smartphones-filter-item" open onClick={onFilterClick}>
      <summary className="smartphones-filter-item__heading">
        <span>{title}</span>
        <img className={clsx("drop-down-arrow", isActive && 'active')} src={drodDownArrow} alt="drop-down-arrow" />
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
