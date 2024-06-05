import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AddAccount,
  AddInterest,
  ConsumptionDetail,
  FindId,
  FindPw,
  Home,
  InterestAnalysis,
  InterestDetail,
  InterestTransaction,
  Login,
  NotFound,
  Register,
  Settings,
  Splash,
  Transaction,
  TransactionDetail,
  ModifyCategory,
  Notification,
} from "./pages";
import Interests from "./pages/interest/Interests";
import PersonalInformation from "./pages/personalInformation/PersonalInformation";
import { RegisterProvider } from "./context/register-context/register-context";

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
        <Route path="/interest/add" element={<AddInterest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/users/info" element={<PersonalInformation />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction/detail/:id" element={<TransactionDetail />} />
        <Route
          path="/transaction/detail/:id/category"
          element={<ModifyCategory />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/interests/analysis/:interestId"
          element={<InterestAnalysis />}
        >
          <Route path="detail" element={<InterestDetail />} />
          <Route path="transaction" element={<InterestTransaction />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RegisterProvider>
  );
}
export default App;
