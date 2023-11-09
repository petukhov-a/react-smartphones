import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: PaginationSliceState = {
    currentPage: 1,
    pageCount: 1,
    itemsPerPage: 4
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
        state.pageCount = action.payload
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
        state.itemsPerPage = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageCount, setItemsPerPage } = paginationSlice.actions

export default paginationSlice.reducer