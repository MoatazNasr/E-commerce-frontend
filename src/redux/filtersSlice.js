import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name:"filters",
    initialState: {
        colors: [],
        sizes: [],
        prices: [],
        categories: []
    },
    reducers: {
        updateFilters: (state, action) => {
            state.colors = action.payload.colorState;
            state.sizes = action.payload.sizeState;
            state.prices = action.payload.priceState;
            state.categories = action.payload.categoriesState;
        },
    }
});


export const { updateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;