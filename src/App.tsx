import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Splash, TransactionHistory } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/TransactionHistory" element={<TransactionHistory />} />
    </Routes>
  );
}

export default App;
