// Mock Firebase auth BEFORE imports
jest.mock("../firebaseConfig", () => ({
    auth: {},
}));

jest.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: jest.fn(),
}));

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginLogout/LoginForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

describe("LoginForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders login form with email and password fields", () => {
        const { container } = render(<LoginForm />);
        
        // Check that form elements are rendered
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("updates email state when email input changes", () => {
        const { container } = render(<LoginForm />);
        
        const emailInput = container.querySelector('input[type="email"]');
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        
        expect(emailInput).toHaveValue("test@example.com");
    });

    test("updates password state when password input changes", () => {
        const { container } = render(<LoginForm />);
        
        const passwordInput = container.querySelector('input[type="password"]');
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        
        expect(passwordInput).toHaveValue("password123");
    });

    test("calls signInWithEmailAndPassword on form submission", async () => {
        signInWithEmailAndPassword.mockResolvedValue({});
        
        const { container } = render(<LoginForm />);
        
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitButton = screen.getByRole("button", { name: /login/i });
        
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
                auth,
                "test@example.com",
                "password123"
            );
        });
    });

    test("displays success alert on successful login", async () => {
        signInWithEmailAndPassword.mockResolvedValue({});
        
        const { container } = render(<LoginForm />);
        
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitButton = screen.getByRole("button", { name: /login/i });
        
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith("Succesfully Signed In!");
        });
    });

    test("displays error message on failed login", async () => {
        const errorMessage = "Invalid email or password";
        signInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));
        
        const { container } = render(<LoginForm />);
        
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitButton = screen.getByRole("button", { name: /login/i });
        
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    test("prevents default form submission behavior", async () => {
        signInWithEmailAndPassword.mockResolvedValue({});
        
        render(<LoginForm />);
        
        const form = screen.getByRole("button", { name: /login/i }).closest("form");
        const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
        
        fireEvent(form, submitEvent);
        
        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalled();
        });
    });

    test("clears error state when new login attempt is made", async () => {
        const errorMessage = "Invalid credentials";
        signInWithEmailAndPassword
            .mockRejectedValueOnce(new Error(errorMessage))
            .mockResolvedValueOnce({});
        
        const { container } = render(<LoginForm />);
        
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitButton = screen.getByRole("button", { name: /login/i });
        
        // First attempt - fails
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrong" } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
        
        // Second attempt - succeeds
        fireEvent.change(passwordInput, { target: { value: "correctpassword" } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(2);
            expect(global.alert).toHaveBeenCalledWith("Succesfully Signed In!");
        });
    });
});

