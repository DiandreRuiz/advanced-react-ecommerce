import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

interface ShoppingCartState {
    items: Product[];
    numberOfItems: number;
    totalPrice: number;
}

const initialState: ShoppingCartState = {
    items: [],
    numberOfItems: 0,
    totalPrice: 0.0,
};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const currentItems = state.items;
            state.items = [...currentItems, action.payload];
        },
    },
});

export default shoppingCartSlice.reducer;
