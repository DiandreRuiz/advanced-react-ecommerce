import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductsDisplayState {
    productCategoryFilters: string[];
}

const initialState: ProductsDisplayState = {
    productCategoryFilters: [],
};

const productsDisplaySlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<string>) => {
            state.productCategoryFilters = [...state.productCategoryFilters, action.payload];
        },
        removeFilter: (state, action: PayloadAction<string>) => {
            const newFilters = state.productCategoryFilters.filter((f) => f !== action.payload);
            state.productCategoryFilters = [...newFilters];
        },
    },
});

export const { addFilter, removeFilter } = productsDisplaySlice.actions;
export default productsDisplaySlice.reducer;
