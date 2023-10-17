import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';

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
    setInternalStorage(state, action: PayloadAction<string>) {
      state.internalStorage = action.payload;
    },
    setRam(state, action: PayloadAction<string>) {
      state.ram = action.payload;
    },
    setBrand(state, action: PayloadAction<string>) {
      state.brand = action.payload;
    },
    setScreenType(state, action: PayloadAction<string>) {
      state.screenType = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setInternalStorage, setRam, setBrand, setScreenType  } = filterSlice.actions

export default filterSlice.reducer