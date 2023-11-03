import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterName, FilterPrices, FilterSetType, FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
  prices: [0, 0],
  internalStorage: [],
  ram: [],
  brand: [],
  screenType: [],
  searchValue: '',
  mainSort: {
    property: 'price',
    title: 'по цене',
    mobileTitle: 'по убыванию цены',
    isAsc: false
  },
  favoritesSort: {
    property: 'price',
    title: 'по цене',
    mobileTitle: 'по убыванию цены',
    isAsc: false
  }
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
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      const filters = action.payload;
      for (let key in filters) {
        const filterKey = key as FilterName;
        state[filterKey] = filters[filterKey];
      }
    },
    setMainSort(state, action: PayloadAction<Sort>) {
      state.mainSort = action.payload;
    },
    setFavoritesSort(state, action: PayloadAction<Sort>) {
      state.favoritesSort = action.payload;
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
    },
    clearFilters(state) {
      for (let filter in state) {
        const filterKey = filter as FilterName;

        if (filter === 'prices') {
          state[filter] = [0, 0];
        } else if (filter === 'mainSort') {
          state.mainSort.property = 'price';
          state.mainSort.title = 'по цене';
          state.mainSort.isAsc = false;
        } else if (filter === 'searchValue') {
          // pass;
        } else {
          state[filterKey] = [];
        }
        
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFilterValue, setSearchValue, removeFilterValue, setPriceFilterValue, clearFilters, setFilters, setMainSort, setFavoritesSort  } = filterSlice.actions

export default filterSlice.reducer