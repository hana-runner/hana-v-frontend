import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  FindId, Home, Interests, Login, Splash, TransactionHistory,
} from "./pages";
import { Register } from "./pages/user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find/id" element={<FindId />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/register" element={<Register />} />
      <Route path="/transactionHistory" element={<TransactionHistory />} />
    </Routes>
  );
}

export default App;
