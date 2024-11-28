import {modalSlice, callTypes} from './Slice';

const {actions} = modalSlice;

export const setDataModal = (data) => (dispatch) => {
  dispatch(actions.setDataModal(data));
};

export const setModalVisible = (data) => (dispatch) => {
  dispatch(actions.setModalVisible(data));
};

export const setDataProcess = (data) => (dispatch) => {
  dispatch(actions.setDataProcess(data));
};

export const setModalProcess = (data) => (dispatch) => {
  dispatch(actions.setModalProcess(data));
};

export const setDataAdvanced = (data) => (dispatch) => {
  dispatch(actions.setDataAdvanced(data));
};

export const setModalAdvanced = (data) => (dispatch) => {
  dispatch(actions.setModalAdvanced(data));
};

export const setDataSearch = (data) => (dispatch) => {
  dispatch(actions.setDataSearch(data));
};

export const resetData = () => (dispatch) => {
  dispatch(actions.resetData());
};

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};

export const setRandomUsers = () => (dispatch) => {
  dispatch(actions.setRandomUsers());
};

export const setDataDatVe = (data) => (dispatch) => {
  dispatch(actions.setDataDatVe(data));
};

export const setDataDanhSachChuyenDiSearch = (data) => (dispatch) => {
  dispatch(actions.setDataDanhSachChuyenDiSearch(data));
};

export const setModalTripVisible = (data) => (dispatch) => {
  dispatch(actions.setModalTripVisible(data));
};

export const setModalDatVeVisible = (data) => (dispatch) => {
  dispatch(actions.setModalDatVeVisible(data));
};

export const setCurrentRole = (data) => (dispatch) => {
  dispatch(actions.setCurrentRole(data));
};

export const setModalPhanHoiVisible = (data) => (dispatch) => {
  dispatch(actions.setModalPhanHoiVisible(data));
};
export const setDataPhanHoi = (data) => (dispatch) => {
  dispatch(actions.setDataPhanHoi(data));
};

export const setCurrentOrganizationUnit = (data) => (dispatch) => {
  dispatch(actions.setCurrentOrganizationUnit(data));
};

export const setModalOrganizationUnit = (data) => (dispatch) => {
  dispatch(actions.setModalOrganizationUnit(data));
};
