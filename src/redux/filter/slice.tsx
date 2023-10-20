import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterPrices, FilterSetType, FilterSliceState } from './types';

const initialState: FilterSliceState = {
  prices: [1, 200000],
  internalStorage: [],
  ram: [],
  brand: [],
  screenType: [],
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterValue(state, action: PayloadAction<FilterSetType>) {
      const filterName = action.payload.propertyName;
      const filterValue = action.payload.filterValue;

      state[filterName].push(filterValue);
    },
    removeFilterValue(state, action: PayloadAction<FilterSetType>) {
      const filterName = action.payload.propertyName;
      const filterValue = action.payload.filterValue;
      const newValues = state[filterName].filter(value => value !== filterValue);
      
      state[filterName] = newValues;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPriceFilterValue(state, action: PayloadAction<FilterPrices>) {
      state.prices = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFilterValue, setSearchValue, removeFilterValue, setPriceFilterValue  } = filterSlice.actions

export default filterSlice.reducer