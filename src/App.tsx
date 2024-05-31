import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AddAccount,
  ConsumptionDetail,
  FindId,
  Home,
  Interests,
  Login,
  Register,
  Splash,
  TransactionHistory,
} from "./pages";
import { FindPw } from "./pages/user";

function App() {
  return (
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
      <Route path="/transactionHistory" element={<TransactionHistory />} />
    </Routes>
  );
}

export default App;
