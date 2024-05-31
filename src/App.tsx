import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddAccount, ConsumptionDetail, Home, Splash } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/consumption" element={<ConsumptionDetail />} />
      <Route path="/add_account" element={<AddAccount />} />
    </Routes>
  );
}

export default App;
