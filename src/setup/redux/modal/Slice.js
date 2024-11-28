import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  random: null,
  randomUsers: null,
  dataModal: null,
  modalVisible: false,
  modalProcess: false,
  dataSearch: null,
  dataProcess: null,

  dataAdvanced: null,
  modalAdvanced: false,

  currentRole: null,

  currentOrganizationUnit: null,
  modalOrganizationUnit: null,

  listLoading: false,
  actionsLoading: false,
  error: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    setDataModal: (state, action) => {
      const payload = action.payload;
      state.dataModal = payload;
      state.dataProcess = null;
    },

    setCurrentRole: (state, action) => {
      const payload = action.payload;
      state.currentRole = payload;
    },

    setCurrentOrganizationUnit: (state, action) => {
      const payload = action.payload;
      state.currentOrganizationUnit = payload;
    },

    setModalOrganizationUnit: (state, action) => {
      const payload = action.payload;
      state.modalOrganizationUnit = payload;
      if (!state.modalOrganizationUnit) {
        state.currentOrganizationUnit = null;
      }
    },

    setModalVisible: (state, action) => {
      const payload = action.payload;
      state.modalProcess = null;
      state.modalVisible = payload;
      if (!state.modalVisible) {
        state.dataModal = null;
      }
    },

    setDataProcess: (state, action) => {
      const payload = action.payload;
      state.dataProcess = payload;
    },

    setModalProcess: (state, action) => {
      const payload = action.payload;
      state.modalProcess = payload;
      if (!state.modalProcess) {
        state.dataProcess = null;
      }
    },

    setDataAdvanced: (state, action) => {
      const payload = action.payload;
      state.dataAdvanced = payload;
    },

    setModalAdvanced: (state, action) => {
      const payload = action.payload;
      state.modalAdvanced = payload;
      if (!state.modalAdvanced) {
        state.dataAdvanced = null;
      }
    },

    setDataSearch: (state, action) => {
      const payload = action.payload;
      state.dataSearch = payload;
    },

    resetData: (state, action) => {
      state = initialState;
    },
    setRandom: (state, action) => {
      state.random = Math.random().toString(32);
    },
    setRandomUsers: (state, action) => {
      state.randomUsers = Math.random().toString(32);
    },
  },
});
