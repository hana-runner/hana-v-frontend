import React from "react";
import { BsTrash3 } from "react-icons/bs";

function AccountInfo() {
  return (
    <div className="w-[348px] h-[156px] bg-white rounded-[24px] p-[20px] mt-[24px]">
      <div className="flex justify-between border-b-2">
        <p className="text-[18px] font-hanaMedium">계좌명</p>
        <BsTrash3 className="text-hanaSilver" />
      </div>
      <p className="mt-[12px] text-left text-[16px]">계좌번호</p>
      <p className="text-[17px] text-right mt-[28px]">은행명</p>
    </div>
  );
}

export default AccountInfo;
