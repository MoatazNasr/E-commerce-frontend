import { createSlice } from "@reduxjs/toolkit";
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    collectionFilters: {
      colors: [],
      sizes: [],
      prices: [],
      categories:[]
    },
    newArrivalsFilters: {
      colors: [],
      sizes: [],
      prices: [],
      categories:[]
    },
  },
  reducers: {
    updateCollectionFilters: (state, action) => {
      state.collectionFilters.colors = action.payload.colorState;
      state.collectionFilters.sizes = action.payload.sizeState;
      state.collectionFilters.prices = action.payload.priceState;
      state.collectionFilters.categories = action.payload.categoriesState;
    },
    updateNewArrivalsFilters: (state, action) => {
      state.newArrivalsFilters.colors = action.payload.colorState;
      state.newArrivalsFilters.sizes = action.payload.sizeState;
      state.newArrivalsFilters.prices = action.payload.priceState;
      state.newArrivalsFilters.categories = action.payload.categoriesState;
    },
  },
});

export const { updateCollectionFilters, updateNewArrivalsFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
