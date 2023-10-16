import { FC } from 'react';
import drodDownArrow from '../assets/img/arrow.svg';

type FilterItemProps = {
  name: string;
  valueList: string[];
  unit?: string;
};

const FilterItem: FC<FilterItemProps> = ({ name, valueList, unit }) => {
  return (
    <details className="smartphones-filter-item" open>
      <summary className="smartphones-filter-item__heading">
        <span>{name}</span>
        <img className="drop-down-arrow" src={drodDownArrow} alt="drop-down-arrow" />
      </summary>
      <ul className="smartphones-filter-item-list">
        {valueList.map((item) => (
          <li>
            <label>
              <input
                name={name}
                type="checkbox"/>
              {unit ? item + ' ' + unit : item}
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default FilterItem;
