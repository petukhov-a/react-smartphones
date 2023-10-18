import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterSetType, FilterSliceState } from './types';

const initialState: FilterSliceState = {
  internalStorage: '',
  ram: '',
  brand: '',
  screenType: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterValue(state, action: PayloadAction<FilterSetType>) {
      const filterName = action.payload.propertyName;
      state[filterName] = action.payload.filterValue;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilterValue  } = filterSlice.actions

export default filterSlice.reducer