import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import PushNotification from "./apis/notification/config";
import { RegisterProvider } from "./context/register-context/register-context";
import { InterestContextProvider } from "./context/interest/InterestContext";
import { ModalProvider } from "./context/ModalContext";
import { Modal } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PushNotification />
      <QueryClientProvider client={queryClient}>
        <RegisterProvider>
          <InterestContextProvider>
            <ModalProvider>
              <Modal />
              <App />
            </ModalProvider>
          </InterestContextProvider>
        </RegisterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
