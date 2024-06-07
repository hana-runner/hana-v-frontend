import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Tooltip from "../common/Tooltip";

const InterestSubtitle = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="bg-white">
      <div className="mx-6 my-4">
        <div className="flex flex-col gap-4 pt-4 pb-6">
          <div className="flex gap-2">
            <p className="text-left">관심사 설명</p>
            <Tooltip message="무엇을 위한 소비인지에 대한 설명입니다. 예) 에스파를 위한 소비">
              <HiOutlineInformationCircle color="darkgray" />
            </Tooltip>
          </div>
          <input
            className="border-b border-hanaGreen indent-2"
            placeholder={placeholder}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InterestSubtitle;
