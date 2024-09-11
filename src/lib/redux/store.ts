import { configureStore } from '@reduxjs/toolkit';
import searchHouseSlice from '../../utils/slices/searchHouseSlice';
import modalSlice from '../../utils/slices/modalSlice';

export const store = configureStore({
    reducer: {
        searchHouse: searchHouseSlice,
        modal: modalSlice,
    },
});

// Thiết lập các kiểu dữ liệu TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
