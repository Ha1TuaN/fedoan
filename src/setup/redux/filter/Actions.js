import {filterSlice, callTypes} from './Slice';

const {actions} = filterSlice;

export const setPrice = (data) => (dispatch) => {
  dispatch(actions.setPrice(data));
};

export const setArea = (data) => (dispatch) => {
  dispatch(actions.setArea(data));
};

export const setType = (data) => (dispatch) => {
  dispatch(actions.setType(data));
};

export const setDistrictId = (data) => (dispatch) => {
  dispatch(actions.setDistrictId(data));
};
export const setProvinceId = (data) => (dispatch) => {
  dispatch(actions.setProvinceId(data));
};

export const setBedRoomCount = (data) => (dispatch) => {
  dispatch(actions.setBedRoomCount(data));
};
export const setBathRoomCount = (data) => (dispatch) => {
  dispatch(actions.setBathRoomCount(data));
};
