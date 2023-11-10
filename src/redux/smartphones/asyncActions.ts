import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Smartphone } from './types';

export const fetchSmartphones = createAsyncThunk<Smartphone[]>(
  'smartphones/fetchSmartphonesStatus',
  async () => {
    const {data: pageData} = await axios.get<Smartphone[]>(`https://run.mocky.io/v3/eea2bd3e-0008-490c-92b6-06545c763a51`);
    return pageData;
  }
);