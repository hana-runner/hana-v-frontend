import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/login/Login";
import FindId from "./pages/user/findId/FindId";
import { Home, Splash, TransactionHistory } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find/id" element={<FindId />} />
      <Route path="/TransactionHistory" element={<TransactionHistory />} />
    </Routes>
  );
}

export default App;
