import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  price: [0, 100000000],
  area: [0, 1000],
  type: [],
  districtId: null,
  provinceId: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setDistrictId: (state, action) => {
      state.districtId = action.payload;
    },
    setProvinceId: (state, action) => {
      state.provinceId = action.payload;
    },
  },
});