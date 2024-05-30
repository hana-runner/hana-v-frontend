import React from "react";

function TransactionHistoryList() {
  return (
    <div className="w-[326px] h-[446px] border-2 rounded-[20px] bg-white mt-[8px] px-[12px] py-[6px] overflow-y-scroll scrollbar-hide">
      <div className="mb-[6px] border-b-2 py-[12px]">
        <div className="text-hanaSilver text-[12px] text-left">time</div>
        <div className="flex justify-between">
          <div className="text-[16px]">transaction name</div>
          <div>amount 원</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[10px]">쇼핑</div>
          <div className="text-[12px]">잔액 150,000 원</div>
        </div>
      </div>
      <div className="mb-[6px] border-b-2 py-[12px]">
        <div className="text-hanaSilver text-[12px] text-left">time</div>
        <div className="flex justify-between">
          <div className="text-[16px]">transaction name</div>
          <div>amount 원</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[10px]">쇼핑</div>
          <div className="text-[12px]">잔액 150,000 원</div>
        </div>
      </div>

    </div>

  );
}

export default TransactionHistoryList;
