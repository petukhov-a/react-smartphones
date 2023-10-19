import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterSetType, FilterSliceState } from './types';

const initialState: FilterSliceState = {
  internalStorage: '',
  ram: '',
  brand: '',
  screenType: '',
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterValue(state, action: PayloadAction<FilterSetType>) {
      const filterName = action.payload.propertyName;
      state[filterName] = action.payload.filterValue;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFilterValue, setSearchValue  } = filterSlice.actions

export default filterSlice.reducer