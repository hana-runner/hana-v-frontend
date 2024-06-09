import React from "react";
import { BsTrash3 } from "react-icons/bs";

interface AccountInfoProps {
  accountTitle: string;
  accountNumber: string;
  accountBankName: string;
}

function AccountInfo({
  accountTitle,
  accountNumber,
  accountBankName,
}: AccountInfoProps) {
  return (
    <div className="w-[348px] h-[156px] bg-white rounded-[24px] p-[20px] mt-[24px]">
      <div className="flex justify-between border-b-2">
        <p className="text-[18px] font-hanaMedium">{accountTitle}</p>
        <BsTrash3 className="text-hanaSilver cursor-pointer" />
      </div>
      <p className="mt-[12px] text-left text-[16px]">{accountNumber}</p>
      <p className="text-[17px] text-right mt-[28px]">{accountBankName}</p>
    </div>
  );
}

export default AccountInfo;
