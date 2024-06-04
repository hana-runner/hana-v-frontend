import React from "react";
import HistoryOption from "../../components/transaction/HistoryOption";
import { TransactionList, Navbar, AccountBoard } from "../../components";

function Transaction() {
  return (
    <section className="flex flex-col items-center flex-wrap">
      <Navbar title="거래내역조회" option={true} logo={false} />
      <AccountBoard />
      <HistoryOption />
      <TransactionList />
    </section>
  );
}

export default Transaction;
