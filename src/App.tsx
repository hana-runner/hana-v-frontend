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
  Transaction,
} from "./pages";

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
      <Route path="/interests" element={<Interests />} />
      <Route path="/register" element={<Register />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
}

export default App;
