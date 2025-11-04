import { configureStore } from "@reduxjs/toolkit";
import productsDisplayReducer from "./productsDisplaySlice";
import shoppingCartReducer from "./shoppingCartSlice";

// Function for retrieving saved cart state from sessionStorage, will be called on store initialization / preloading.
const loadCartState = () => {
    try {
        const serializedState = sessionStorage.getItem("shoppingCart");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Could not load cart state: ", error);
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        productsDisplay: productsDisplayReducer,
        shoppingCart: shoppingCartReducer,
    },
    preloadedState: {
        shoppingCart: loadCartState(),
    },
});

// This will ocurr on any actions called that could update a part of the state tree
store.subscribe(() => {
    try {
        const state = store.getState().shoppingCart;
        const serialized = JSON.stringify(state);
        sessionStorage.setItem("shoppingCart", serialized);
    } catch (error) {
        console.error("Could not save cart to session storage: ", error);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
