import React from "react";
import { AccountBoard, Navbar } from "../components";
import HistoryOption from "../components/transaction/HistoryOption";
import TransactionList from "../components/transaction/TransactionList";

function Transaction() {
  return (
    <section className="flex flex-col items-center flex-wrap">
      <Navbar title="거래내역조회" option={false} />
      <AccountBoard />
      <HistoryOption />
      <TransactionList />
    </section>
  );
}

export default Transaction;
