import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

interface ShoppingCartState {
    products: Product[];
    numberOfItems: number;
    totalPrice: number;
}
const startingZeroFloat = 0.0;
const initialState: ShoppingCartState = {
    products: [],
    numberOfItems: 0,
    totalPrice: parseFloat(startingZeroFloat.toFixed(2)),
};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const currentProducts = state.products;
            state.products = [...currentProducts, action.payload];
            state.totalPrice += parseFloat(action.payload.price.toFixed(2));
            state.numberOfItems += 1;
        },
        removeItem: (state, action: PayloadAction<Product>) => {
            const currentProducts = state.products;
            state.products = currentProducts.filter((p) => p.id !== action.payload.id);
            state.totalPrice -= parseFloat(action.payload.price.toFixed(2));
            state.numberOfItems -= 1;
        },
    },
});

export const { addItem, removeItem } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
