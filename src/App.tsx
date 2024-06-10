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
  Interests,
  InterestAnalysis,
  InterestDetail,
  InterestTransaction,
  Login,
  ModifyInterest,
  NotFound,
  Notification,
  Register,
  Settings,
  Splash,
  Transaction,
  TransactionDetail,
  PersonalInformation,
  ModifyCategory,
  ModifyTransactionDetail,
  MenuTab,
  AccountManagement,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/consumption" element={<ConsumptionDetail />} />
      <Route path="/add_account" element={<AddAccount />} />
      <Route path="/manage_account" element={<AccountManagement />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find/id" element={<FindId />} />
      <Route path="/find/password" element={<FindPw />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/interest/add" element={<AddInterest />} />
      <Route path="/interest/modify/:interestId" element={<ModifyInterest />} />
      <Route
        path="/interests/analysis/:interestId"
        element={<InterestAnalysis />}
      >
        <Route path="detail" element={<InterestDetail />} />
        <Route path="transaction" element={<InterestTransaction />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/users/info" element={<PersonalInformation />} />
      <Route path="/transaction/:id" element={<Transaction />} />
      <Route
        path="/transaction/:accountId/detail/:id"
        element={<TransactionDetail />}
      />
      <Route
        path="/transaction/detail/:id/category"
        element={<ModifyCategory />}
      />
      <Route
        path="/transaction/detail/:id/interest"
        element={<ModifyTransactionDetail />}
      />

      <Route path="/settings" element={<Settings />} />
      <Route path="/menu" element={<MenuTab />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
