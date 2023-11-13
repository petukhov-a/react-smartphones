import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Smartphone, SmartphoneSliceState, Status } from './types';
import { fetchSmartphones } from './asyncActions';

const initialState: SmartphoneSliceState = {
    items: [],
    status: Status.LOADING
}

export const smartphoneSlice = createSlice({
  name: 'smartphone',
  initialState,
  reducers: {
    setSmartphones(state, action: PayloadAction<Smartphone[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmartphones.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchSmartphones.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchSmartphones.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      })
  },
})

// Action creators are generated for each case reducer function
export const { setSmartphones } = smartphoneSlice.actions

export default smartphoneSlice.reducer