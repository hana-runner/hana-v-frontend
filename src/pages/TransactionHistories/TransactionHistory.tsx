/* eslint-disable react/react-in-jsx-scope */

import { AccountBoard, Navbar } from "../../components";
import HistoryOption from "../../components/HistoryOption";

function TransactionHistory() {
  return (
    <section className="flex flex-col items-center">
      <Navbar title="거래내역조회" option={false} />
      <AccountBoard />
      <HistoryOption />
    </section>
  );
}

export default TransactionHistory;
