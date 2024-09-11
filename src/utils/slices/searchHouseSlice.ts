import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchHouse {
    address: string;
    city: string;
    ward: string;
    maxPrice: number;
    minPrice: number;
}

const initialState: SearchHouse = {
    address: '',
    city: '',
    ward: '',
    maxPrice: 100000000,
    minPrice: 0,
};

const searchHouseSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setWard: (state, action: PayloadAction<string>) => {
            state.ward = action.payload;
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = action.payload;
        },
        setMinPrice: (state, action: PayloadAction<number>) => {
            state.minPrice = action.payload;
        },
    },
});

export const { setAddress, setCity, setWard, setMaxPrice, setMinPrice } = searchHouseSlice.actions;
export default searchHouseSlice.reducer;
