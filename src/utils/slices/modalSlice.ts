import { createSlice } from '@reduxjs/toolkit';

interface modal {
    random: string;
    dataModal: any;
    modalVisible: boolean;
}
const initialState = {
    random: '',
    dataModal: null,
    modalVisible: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setDataModal: (state, action) => {
            const payload = action.payload;
            state.dataModal = payload;
        },
        setModalVisible: (state, action) => {
            const payload = action.payload;
            state.modalVisible = payload;
            if (!state.modalVisible) {
                state.dataModal = null;
            }
        },
        setRandom: (state, action) => {
            state.random = Math.random().toString(32);
        },
    },
});

export const { setDataModal, setModalVisible, setRandom } = modalSlice.actions;
export default modalSlice.reducer;
