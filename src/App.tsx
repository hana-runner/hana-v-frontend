import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./components";

function App() {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const isHeader = path === "/splash";

  useEffect(() => {
    navigate("/splash");
  }, [navigate]);

  return isHeader ? (
    <Outlet />
  ) : (
    <>
      <Navbar title="Hana" option={false} />
      <Outlet />
    </>
  );
}

export default App;
