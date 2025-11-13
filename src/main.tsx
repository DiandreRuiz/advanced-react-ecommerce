import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAuthProvider } from "./components/LoginLogout/FirebaseAuthProvider.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <FirebaseAuthProvider>
                <ReduxProvider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </ReduxProvider>
            </FirebaseAuthProvider>
        </BrowserRouter>
    </StrictMode>
);
