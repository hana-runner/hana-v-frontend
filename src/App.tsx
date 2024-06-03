import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AddAccount,
  ConsumptionDetail,
  FindId,
  FindPw,
  Home,
  Interests,
  Login,
  Register,
  Settings,
  Splash,
  Transaction,
} from "./pages";
import { RegisterProvider } from "./components/context/register-context/register-context";

function App() {
  return (
    <RegisterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/consumption" element={<ConsumptionDetail />} />
        <Route path="/add_account" element={<AddAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find/id" element={<FindId />} />
        <Route path="/find/password" element={<FindPw />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </RegisterProvider>
  );
}

export default App;
