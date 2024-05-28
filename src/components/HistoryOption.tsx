/* eslint-disable react/react-in-jsx-scope */
import { CiSearch, CiSettings } from "react-icons/ci";

function HistoryOption() {
  const startDate = "2024-01-01";
  const endDate = "2024-05-05";
  const option = "전체";

  return (
    <div className="w-[319px] flex flex-wrap justify-between">
      <div className="flex items-center">
        <CiSearch />
        <span className="text-[8px] ml-[16px]">
          {startDate}
          {" "}
          ~
          {" "}
          {endDate}
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-[8px] mr-[4px]">{option}</span>
        <CiSettings />
      </div>
    </div>
  );
}

export default HistoryOption;
