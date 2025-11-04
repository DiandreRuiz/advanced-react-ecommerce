import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

interface ShoppingCartState {
    products: Product[];
    quantities: Record<number, number>;
    numberOfItems: number;
    totalPrice: number;
}

const initialState: ShoppingCartState = {
    products: [],
    quantities: {},
    numberOfItems: 0,
    totalPrice: 0.0,
};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            // Most readable modern way
            // Existence check (works because 0 is a valid stored value; we want to distinguish undefined)
            if (state.quantities?.[action.payload.id] !== undefined) {
                state.quantities[action.payload.id]! += 1;
            } else {
                state.products.push(action.payload);
                state.quantities ??= {};
                state.quantities[action.payload.id] = 1;
            }
            state.totalPrice += action.payload.price;
            state.numberOfItems += 1;
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const id = action.payload.id;
            if (state.quantities[id] !== undefined) {
                state.quantities[id] -= 1;
                state.totalPrice -= action.payload.price;
                state.numberOfItems -= 1;

                if (state.quantities[id] === 0) {
                    delete state.quantities[id];
                    state.products = state.products.filter((p) => p.id !== id);
                }
            } else {
                console.error(`Attempted removal of product ID ${id} however no instances were found`);
            }
        },
        clearProduct: (state, action: PayloadAction<Product>) => {
            const id = action.payload.id;
            if (state.quantities[id] !== undefined) {
                // We first reduce total item count by quantity state for this product
                state.numberOfItems -= state.quantities[id];
                state.totalPrice -= action.payload.price * state.quantities[id];
                delete state.quantities[id];
                state.products = state.products.filter((p) => p.id !== id);
            } else {
                console.error(`Attempted clearning of productID ${id} however no instances were found`);
            }
        },
    },
});

export const { addProduct, removeProduct, clearProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
