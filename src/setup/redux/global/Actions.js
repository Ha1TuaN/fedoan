import {globalSlice, callTypes} from './Slice';

const {actions} = globalSlice;

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};

export const setCurrentOrganizationUnit = (data) => (dispatch) => {
  dispatch(actions.setCurrentOrganizationUnit(data));
};

export const setModalOrganizationUnit = (data) => (dispatch) => {
  dispatch(actions.setModalOrganizationUnit(data));
};
