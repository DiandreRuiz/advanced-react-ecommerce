import { configureStore } from "@reduxjs/toolkit";
import productsDisplayReducer from "./productsDisplaySlice";
import shoppingCartReducer from "./shoppingCartSlice";

export const store = configureStore({
    reducer: {
        productsDisplay: productsDisplayReducer,
        shoppingCart: shoppingCartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
