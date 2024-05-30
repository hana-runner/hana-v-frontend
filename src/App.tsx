import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Splash } from "./pages";
import Login from "./pages/user/login/Login";
import FindId from "./pages/user/find-id/FindId";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find/id" element={<FindId />} />
    </Routes>
  );
}

export default App;
