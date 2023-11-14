import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Smartphone } from './types';

export const fetchSmartphones = createAsyncThunk<Smartphone[]>(
  'smartphones/fetchSmartphonesStatus',
  async () => {
    const {data: pageData} = await axios.get<Smartphone[]>(`https://mocki.io/v1/5ffbcdc6-ffae-418e-a131-30622563ddf4`);
    return pageData;
  }
);