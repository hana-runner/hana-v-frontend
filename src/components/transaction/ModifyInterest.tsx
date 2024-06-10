import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineMinusCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

interface ModifyInterestProps {
  interests: TransactionInterestDetail[];
  amount: number;
  description: string;
  interestId: number;
  onDescriptionChange: (description: string) => void;
  onAmountChange: (amount: number) => void;
  onInterestChange: (interestId: number) => void;
  onDelete: () => void;
}

function ModifyInterest({
  interests,
  amount,
  description,
  interestId,
  onDescriptionChange,
  onAmountChange,
  onInterestChange,
  onDelete,
}: ModifyInterestProps) {
  const [childAmount, setChildAmount] = useState(amount);
  const [childDescription, setChildDescription] = useState(description);
  const [childInterestId, setChildInterestId] = useState(interestId);

  useEffect(() => {
    setChildAmount(amount);
    setChildDescription(description);
    setChildInterestId(interestId);
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
    const newInterestId = parseInt(e.target.value, 10);
    setChildInterestId(newInterestId);
    onInterestChange(newInterestId);
  };

  return (
    <div className="w-[326px] h-[114px] mt-[16px] rounded-[20px] bg-white border-2 border-hanaSilver-300 px-[10px] pt-[30px] pb-[10px] flex flex-col justify-center items-center">
      {/* <button
        type="button"
        className="absolute top-2 right-3 items-end text-hanaSilver font-hanaBold flex-wrap justify-end"
        onClick={onDelete}
      >
        <IoClose />
      </button> */}

      <div className="flex justify-between">
        <div>
          <div className="flex justify-between text-[8px] mr-[2px]">
            <p>내역</p>
            <p>금액</p>
          </div>
          <div className="flex justify-between">
            <div>
              <input
                type="text"
                placeholder="내용을 입력하세요."
                className="w-[138px] h-[26px] border-b-2 text-[12px]"
                value={childDescription}
                onChange={handleDescriptionChange}
              />
              <p className="text-[8px] text-right mt-[4px] text-hanaSilver">
                최대 10자
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="금액을 입력하세요."
                className="w-[70px] h-[26px] border-b-2 text-[12px] text-right ml-[8px]"
                value={childAmount.toString()}
                onChange={handleAmountChange}
              />
              <p className="text-[8px] text-right mt-[4px] text-hanaSilver">
                단위(원)
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-[15px] ml-[8px]">
          <p className="text-[8px] text-right mb-[4px]">관심사</p>
          <select
            name="interests"
            className="border-b-2 border-hanaSilver-300 text-[12px] pb-[4px]"
            value={childInterestId}
            onChange={handleInterestChange}
          >
            {interests?.map((interest) => (
              <option key={interest.interestId} value={interest.interestId}>
                {interest.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="button" onClick={onDelete}>
        <AiOutlineDelete className="mt-2 text-hanaSilver" size={14} />
      </button>
    </div>
  );
}

export default ModifyInterest;
