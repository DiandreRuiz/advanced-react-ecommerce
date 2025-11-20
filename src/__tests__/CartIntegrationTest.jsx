// Mock dependencies BEFORE imports
jest.mock("../firebaseConfig", () => ({
    db: {},
    auth: {},
}));
jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
}));
jest.mock("@tanstack/react-query");
jest.mock("../components/LoginLogout/FirebaseAuthProvider", () => ({
    useFirebaseAuth: () => ({
        user: null,
        loading: false,
        error: null,
    }),
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductsDisplay from "../components/ProductsDisplay";
import ShoppingCartDropdown from "../components/ShoppingCartDropdown";
import shoppingCartReducer from "../redux/shoppingCartSlice";
import productsDisplayReducer from "../redux/productsDisplaySlice";
import { useQuery } from "@tanstack/react-query";

describe("Cart Integration Test", () => {
    let store;

    const mockProduct = {
        id: 1,
        title: "Test Product",
        price: 29.99,
        description: "A test product",
        category: "electronics",
        image: "https://example.com/image.jpg",
    };

    beforeEach(() => {
        // Create a fresh store for each test
        store = configureStore({
            reducer: {
                shoppingCart: shoppingCartReducer,
                productsDisplay: productsDisplayReducer,
            },
        });

        // Mock useQuery to return products
        useQuery.mockReturnValue({
            data: [mockProduct],
            isLoading: false,
            isError: false,
            error: null,
        });
    });

    test("cart updates when adding a product", async () => {
        // Render both components with Redux Provider
        render(
            <Provider store={store}>
                <div>
                    <ShoppingCartDropdown />
                    <ProductsDisplay />
                </div>
            </Provider>
        );

        // Initially, cart should show 0 items
        expect(screen.getByText(/🛒 0/)).toBeInTheDocument();

        // Find and click "Add to Cart" button
        const addToCartButton = screen.getByText("Add to Cart");
        fireEvent.click(addToCartButton);

        // Wait for cart to update - verify item count increases
        await waitFor(() => {
            // Cart should now show 1 item
            expect(screen.getByText(/🛒 1/)).toBeInTheDocument();
        });

        // Open the cart dropdown to verify product details
        const cartButton = screen.getByText(/🛒 1/);
        fireEvent.click(cartButton);

        // Verify product appears in cart with correct details
        // Check for cart-specific indicators:
        // 1. Checkout button appears (only shows when cart has items)
        // 2. Checkout button shows correct total
        await waitFor(() => {
            const checkoutButton = screen.getByText(/Checkout/);
            expect(checkoutButton).toBeInTheDocument();
            // Verify the total price is displayed in checkout button
            expect(checkoutButton).toHaveTextContent(/\$29\.99/);
        });
    });
});

