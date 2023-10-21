import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import drodDownArrow from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { FilterPrices } from '../redux/filter/types';
import { setPriceFilterValue } from '../redux/filter/slice';
import debounce from 'lodash.debounce';
import { selectSmartphones } from '../redux/smartphones/selectors';

const FilterPrice = () => {
  const { prices } = useSelector(selectFilter);
  const [smartphonePrices, setSmartphonePrices] = useState<FilterPrices>([0, 0]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSmartphonePrices([prices[0], prices[1]]);
  }, [prices]);

  const updatePriceValue = useCallback(
    debounce((newPrices: FilterPrices) => {
      dispatch(setPriceFilterValue(newPrices));
    }, 250),
    [],
  );

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newPrices = [...smartphonePrices] as FilterPrices;
    const newPrice = Number(event.target.value);
    newPrices[index] = newPrice;
    setSmartphonePrices(newPrices);
    updatePriceValue(newPrices);
  };

  return (
    <details className="smartphones-filter-item" open>
      <summary className="smartphones-filter-item__heading">
        <span>Цена</span>
        <img className="drop-down-arrow" src={drodDownArrow} alt="drop-down-arrow" />
      </summary>
      <div className="price-inputs">
        <input
            type="number"
            className="checkbox-input"
            value={smartphonePrices[0] || ''}
            onChange={(e) => onInputChange(e, 0)} />
        <span>–</span>
        <input
            type="number"
            className="checkbox-input"
            value={smartphonePrices[1] || ''}
            onChange={(e) => onInputChange(e, 1)} />
      </div>
    </details>
  );
}

export default FilterPrice