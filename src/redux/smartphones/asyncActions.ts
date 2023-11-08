import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Smartphone } from './types';

export const fetchSmartphones = createAsyncThunk<Smartphone[]>(
  'smartphones/fetchSmartphonesStatus',
  async () => {
    const {data: pageData} = await axios.get<Smartphone[]>(`https://64de3b97825d19d9bfb254c6.mockapi.io/items`);
    return pageData;
  }
);