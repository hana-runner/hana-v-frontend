import React from "react";

interface ModifyInterestProps {
  amount: number;
  description: string;
  onAmountChange: (amount: number) => void;
}

function ModifyInterest({
  amount,
  description,
  onAmountChange,
}: ModifyInterestProps) {
  // description이 10자를 넘어가면 자르기
  const truncatedDescription =
    description.length > 10 ? description.substring(0, 10) : description;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value) || 0;
    onAmountChange(newAmount);
  };

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
              defaultValue={truncatedDescription}
            />
            <p className="text-[8px] text-right mt-[4px] text-hanaSilver">
              최대 10자
            </p>
          </div>
          <div>
            <input
              type="number"
              placeholder="금액을 입력하세요."
              className="w-[92px] h-[26px] border-b-2 text-[12px]"
              defaultValue={amount.toString()}
              onChange={handleAmountChange}
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
