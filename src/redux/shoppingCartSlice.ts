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
            const instancesOfProduct = state.products.filter((p) => p.id === action.payload.id);
            if (instancesOfProduct.length > 0) {
                instancesOfProduct.pop();
                state.products = [...state.products.filter((p) => p.id !== action.payload.id), ...instancesOfProduct];
                state.totalPrice -= action.payload.price;
                state.numberOfItems -= 1;
            } else {
                console.error(
                    `Attempted removal of product ID ${action.payload.id} however no instances of that product were found`
                );
            }
        },
    },
});

export const { addProduct, removeProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
