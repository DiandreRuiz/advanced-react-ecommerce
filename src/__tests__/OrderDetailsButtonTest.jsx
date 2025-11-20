// Mock dependencies BEFORE imports
jest.mock("firebase/auth", () => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
}));
jest.mock("../firebaseConfig", () => ({
    db: {},
    auth: {},
}));
jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
}));
jest.mock("@tanstack/react-query");
jest.mock("../components/LoginLogout/FirebaseAuthProvider");

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrdersDisplay from "../components/OrdersDisplayPage/OrdersDisplay";
import { useQuery } from "@tanstack/react-query";
import { useFirebaseAuth } from "../components/LoginLogout/FirebaseAuthProvider";

describe("OrdersDisplay - Order Details Button", () => {
    const mockUser = {
        uid: "test-user-123",
        email: "test@example.com",
    };

    const mockTimestamp = {
        toDate: () => new Date("2024-01-15T10:30:00"),
    };

    const mockOrder = {
        id: "order-123",
        userId: "test-user-123",
        creationDateTime: mockTimestamp,
        total: 99.99,
        numberOfItems: 2,
        products: [
            {
                id: 1,
                title: "Test Product 1",
                price: 49.99,
                description: "Test description 1",
                category: "test",
                image: "https://example.com/image1.jpg",
            },
            {
                id: 2,
                title: "Test Product 2",
                price: 50.00,
                description: "Test description 2",
                category: "test",
                image: "https://example.com/image2.jpg",
            },
        ],
        productQuantities: {
            1: 1,
            2: 1,
        },
    };

    beforeEach(() => {
        // Mock useFirebaseAuth
        useFirebaseAuth.mockReturnValue({
            user: mockUser,
            loading: false,
            error: null,
        });

        // Mock useQuery
        useQuery.mockReturnValue({
            data: [mockOrder],
            isLoading: false,
            isError: false,
            error: null,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders order card with Order Details button", () => {
        render(<OrdersDisplay />);
        
        // Check that order information is rendered
        expect(screen.getByText(/Order # order-123/)).toBeInTheDocument();
        expect(screen.getByText("$99.99")).toBeInTheDocument();
        
        // Check that Order Details button is present
        const orderDetailsButton = screen.getByText("Order Details");
        expect(orderDetailsButton).toBeInTheDocument();
    });

    test("opens modal when Order Details button is clicked", async () => {
        render(<OrdersDisplay />);
        
        const orderDetailsButton = screen.getByText("Order Details");
        fireEvent.click(orderDetailsButton);

        // Wait for modal to appear
        await waitFor(() => {
            expect(screen.getByText(/Order #:/)).toBeInTheDocument();
        });

        // Verify modal displays order ID
        expect(screen.getByText(/Order #: order-123/)).toBeInTheDocument();
    });

    test("modal displays product quantities correctly", async () => {
        render(<OrdersDisplay />);
        
        const orderDetailsButton = screen.getByText("Order Details");
        fireEvent.click(orderDetailsButton);

        await waitFor(() => {
            // Use getAllByText since there are multiple matches
            const quantityIndicators = screen.getAllByText(/\(x1\)/);
            expect(quantityIndicators.length).toBe(2);
        });
    });

    test("displays loading spinner when data is loading", () => {
        useQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
            error: null,
        });

        const { container } = render(<OrdersDisplay />);
        const spinner = container.querySelector(".spinner-border");
        expect(spinner).toBeInTheDocument();
    });

    test("displays error message when query fails", () => {
        useQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: { message: "Failed to fetch orders" },
        });

        render(<OrdersDisplay />);
        expect(screen.getByText(/Error loading orders!/)).toBeInTheDocument();
        expect(screen.getByText(/Failed to fetch orders/)).toBeInTheDocument();
    });
});
