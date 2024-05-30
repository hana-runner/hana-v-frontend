import React from "react";
import { AccountBoardInfo } from "../types/accountBoardInfo";

const AccountBoard: React.FC = () => {
  const account: AccountBoardInfo = {
    balance: 1200000,
    totalBalance: 120000,
    accountName: "마이 통장",
    accountNumber: "123-45678-98765",
  };

  const formattedBalance = account.balance.toLocaleString();
  const formattedTotalBalance = account.totalBalance.toLocaleString();

  return (
    <div className="w-[326px] h-[145px] m-[20px] p-[18px] text-left shadow-xl rounded-[20px] bg-white">
      <div>
        <div className="flex items-center">
          <img src="/img/logo3.png" alt="logo3" className="w-[32px] h-[32px]" />
          <p className="ml-[4px] text-[20px]">{account.accountName}</p>
        </div>
        <p className="mt-[4px] ml-[34px] text-[12px] text-hanaSilver">{account.accountNumber}</p>
      </div>

      <div className="text-right text-[20px]">
        <div>
          <span>{formattedBalance}</span>
          {" "}
          원
        </div>
        <div className="text-[12px] text-hanaSilver">
          출금가능잔액
          <span className="ml-[4px]">{formattedTotalBalance}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountBoard;
