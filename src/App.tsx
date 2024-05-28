import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Splash } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
    </Routes>
  );
}

export default App;
