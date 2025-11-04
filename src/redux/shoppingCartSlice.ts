import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

interface ShoppingCartState {
    products: Product[];
    numberOfItems: number;
    totalPrice: number;
}

const initialState: ShoppingCartState = {
    products: [],
    numberOfItems: 0,
    totalPrice: 0.0,
};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const currentProducts = state.products;
            state.products = [...currentProducts, action.payload];
            state.totalPrice += action.payload.price;
            state.numberOfItems += 1;
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const currentProducts = state.products;
            state.products = currentProducts.filter((p) => p.id !== action.payload.id);
            state.totalPrice -= action.payload.price;
            state.numberOfItems -= 1;
        },
    },
});

export const { addProduct, removeProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
