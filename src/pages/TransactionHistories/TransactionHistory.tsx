import React from "react";
import { AccountBoard, Navbar } from "../../components";
import HistoryOption from "../../components/transaction/HistoryOption";
import TransactionHistoryList from "../../components/transaction/TransactionHistoryList";

function TransactionHistory() {
  return (
    <section className="flex flex-col items-center flex-wrap">
      <Navbar title="거래내역조회" option={false} />
      <AccountBoard />
      <HistoryOption />
      <TransactionHistoryList />
    </section>
  );
}

export default TransactionHistory;
