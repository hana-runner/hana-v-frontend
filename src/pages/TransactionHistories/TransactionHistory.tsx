/* eslint-disable react/react-in-jsx-scope */

import { AccountBoard, Navbar } from "../../components";

function TransactionHistory() {
  return (
    <section className="flex flex-col items-center">
      <Navbar title="거래내역조회" option={false} />
      <AccountBoard />
    </section>
  );
}

export default TransactionHistory;
