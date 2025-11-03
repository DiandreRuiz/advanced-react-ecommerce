import { configureStore } from "@reduxjs/toolkit";
import productsDisplayReducer from "./productsDisplaySlice";

export const store = configureStore({
    reducer: {
        productsDisplay: productsDisplayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
