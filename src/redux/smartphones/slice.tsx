import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Smartphone, SmartphoneSliceState } from './types';

const initialState: SmartphoneSliceState = {
    items: [],
}

export const smartphoneSlice = createSlice({
  name: 'smartphone',
  initialState,
  reducers: {
    setSmartphones(state, action: PayloadAction<Smartphone[]>) {
        state.items = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSmartphones } = smartphoneSlice.actions

export default smartphoneSlice.reducer