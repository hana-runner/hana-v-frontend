import React from "react";

function ModifyInterest() {
  return (
    <div className="w-[326px] h-[114px] rounded-[20px] mt-[16px] bg-white border-2 border-hanaSilver-300 flex justify-between px-[10px] py-[30px]">
      <div>
        <div className="flex justify-between text-[8px]">
          <p>내역</p>
          <p>금액</p>
        </div>
        <div className="flex justify-between">
          <div>
            <input
              type="text"
              placeholder="내용을 입력하세요."
              className="w-[145px] h-[26px] border-b-2 text-[12px]"
            />
            <p className="text-[8px] text-right mt-[4px] text-hanaSilver">
              최대 10자
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="금액을 입력하세요."
              className="w-[92px] h-[26px] border-b-2 text-[12px]"
            />
            <p className="text-[8px] text-right mt-[4px] text-hanaSilver">
              단위(원)
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mb-[10px]">
        <p className="text-[8px] text-right mb-[4px]">관심사</p>
        <select
          name="interests"
          className="border-b-2 border-hanaSilver-300 text-[12px] pb-[3px]"
        >
          <option value="1">사과</option>
        </select>
      </div>
    </div>
  );
}

export default ModifyInterest;
