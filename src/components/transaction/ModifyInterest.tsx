import React, { useState, useEffect } from "react";

interface ModifyInterestProps {
  interests: TransactionInterestDetail[];
  amount: number;
  description: string;
  interestId: number;
  onDescriptionChange: (description: string) => void;
  onAmountChange: (amount: number) => void;
  onInterestChange: (interestId: number) => void; // 추가된 prop
}

function ModifyInterest({
  interests,
  amount,
  description,
  interestId,
  onDescriptionChange,
  onAmountChange,
  onInterestChange, // 추가된 prop
}: ModifyInterestProps) {
  const [childAmount, setChildAmount] = useState(amount);
  const [childDescription, setChildDescription] = useState(description);
  const [childInterestId, setChildInterestId] = useState(interestId); // 추가된 상태

  // description이 10자를 넘어가면 자르기
  const truncatedDescription =
    description.length > 10 ? description.substring(0, 10) : description;

  useEffect(() => {
    setChildAmount(amount);
    setChildDescription(description);
    setChildInterestId(interestId); // 추가된 useEffect
  }, [amount, description, interestId]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setChildDescription(newDescription);
    onDescriptionChange(newDescription);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value) || 0;
    setChildAmount(newAmount);
    onAmountChange(newAmount);
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInterestId = parseInt(e.target.value);
    setChildInterestId(newInterestId);
    onInterestChange(newInterestId);
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
              value={childDescription}
              onChange={handleDescriptionChange}
            />
            <p className="text-[8px] text-right mt-[4px] text-hanaSilver">
              최대 10자
            </p>
          </div>
          <div>
            <input
              type="number"
              placeholder="금액을 입력하세요."
              className="w-[92px] h-[26px] border-b-2 text-[12px] text-right"
              value={childAmount.toString()}
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
          value={childInterestId} // 추가된 부분
          onChange={handleInterestChange} // 추가된 핸들러
        >
          {interests?.map((interest) => (
            <option key={interest.interestId} value={interest.interestId}>
              {interest.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ModifyInterest;
