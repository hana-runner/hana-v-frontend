import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import moment from "moment";
import HistoryOptionBoard from "./HistoryOptionBoard";

function HistoryOption() {
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(today);
  const [period, setPeriod] = useState<number | undefined>(0);
  const [transaction, setTransaction] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleDate = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    setIsModalOpen(false);
  };
  const handleOption = (periodName: number | undefined, entireView: number, orderBy: number) => {
    setPeriod(periodName);
    setTransaction(entireView);
    setOrder(orderBy);
  };
  const getPeriodText = () => {
    switch (period) {
      case 1:
        return "1개월";
      case 3:
        return "3개월";
      case 6:
        return "6개월";
      case 12:
        return "1년";
      default:
        return "전체";
    }
  };
  const getTransactionText = () => {
    switch (transaction) {
      case 1:
        return "입금";
      case 2:
        return "출금";
      default:
        return "전체";
    }
  };
  const getOrderText = () => {
    switch (order) {
      case 1:
        return "과거순";
      default:
        return "최신순";
    }
  };

  return (
    <div className="relative">
      <div className="w-[319px] flex flex-wrap justify-between">
        <div className="flex items-center">
          <span className="text-[8px] font-bold">기간 : </span>
          <span className="text-[8px] ml-[4px]">
            {startDate ? moment(startDate).format("YYYY-MM-DD") : ""}
            {" "}
            ~
            {" "}
            {endDate ? moment(endDate).format("YYYY-MM-DD") : ""}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[8px] mr-[4px]">
            {getPeriodText()}
            {"  /  "}
            {getTransactionText()}
            {"  /  "}
            {getOrderText()}
          </span>
          <CiSettings onClick={openModal} className="cursor-pointer" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed mt-[208px] inset-0 flex justify-center transform transition-transform duration-100 ease-in-out">
          <HistoryOptionBoard
            closeModal={closeModal}
            confirmDate={handleDate}
            confirmOption={handleOption}
          />
        </div>
      )}
    </div>
  );
}

export default HistoryOption;
