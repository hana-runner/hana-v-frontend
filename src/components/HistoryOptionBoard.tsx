import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import Calendar, { CalendarProps } from "react-calendar";
import PeoridBtn from "./PeoridBtn";
import "react-calendar/dist/Calendar.css";
import CalculateDate from "../utils/CalculateDate";

interface HistoryOptionBoardProps {
  closeModal: () => void;
  confirmDate: (start: Date | undefined, end: Date | undefined, period: number | undefined) => void;
  confirmOption: (period: number | undefined, entireView: number, order: number) => void;
}

function HistoryOptionBoard({ closeModal, confirmDate, confirmOption }: HistoryOptionBoardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<number | undefined>(undefined);
  const today = new Date();
  const [isStartDate, setStartDate] = useState<Date | undefined>(undefined);
  const [isEndDate, setEndDate] = useState<Date>(today);
  const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setEndCalendarOpen] = useState(false);
  const [entireViewOption, setEntireViewOption] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);

  const handleStartToggleCalendar = () => {
    setStartCalendarOpen(!isStartCalendarOpen);
  };

  const handleEndToggleCalendar = () => {
    setEndCalendarOpen(!isEndCalendarOpen);
  };

  const handleStartDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setStartDate(value);
      setSelectedPeriod(undefined); // Clear the period
      setStartCalendarOpen(false);
    }
  };

  const handleEndDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setEndDate(value);
      setEndCalendarOpen(false);
    }
  };

  const handleConfirm = () => {
    confirmDate(isStartDate, isEndDate, selectedPeriod);
    confirmOption(selectedPeriod, entireViewOption, order);
    closeModal();
  };

  const handlePeriod = (month: number) => {
    setStartDate(CalculateDate(isEndDate, month));
    setSelectedPeriod(month);
  };

  const handleEntireViewOption = (entireView: number) => {
    setEntireViewOption(entireView);
  };

  const handleOrder = (orderOption: number) => {
    setOrder(orderOption);
  };

  useEffect(() => {
    if (isStartDate && !selectedPeriod) {
      setSelectedPeriod(undefined);
    }
  }, [isStartDate, selectedPeriod]);

  const periodOptions = [
    { month: 1, description: "1개월" },
    { month: 3, description: "3개월" },
    { month: 6, description: "6개월" },
    { month: 12, description: "1년" },
  ];

  const entireViewTexts = [
    { month: 0, description: "전체" },
    { month: 1, description: "입금" },
    { month: 2, description: "출금" },
  ];

  const orderTexts = [
    { month: 0, description: "최신순" },
    { month: 1, description: "과거순" },
  ];

  return (
    <div className="w-[390px] h-[590px] border-t-2 border-hanaSilver rounded-[40px] bg-white">
      <div className="flex border-b-2 border-hanaSilver-300">
        <CgClose onClick={closeModal} className="m-[20px] cursor-pointer" />
        <p className="flex ml-[110px] items-center">조회 옵션</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="py-[24px]">조회기간</p>
        <div id="btnGroup1" className="flex align-middle items-center">
          {periodOptions.map((option) => (
            <PeoridBtn
              key={option.month}
              month={option.month}
              description={option.description}
              width="w-[76px]"
              height="h-[25px]"
              selected={selectedPeriod === option.month}
              onClick={() => handlePeriod(option.month)}
            />
          ))}
        </div>
        <div className="flex items-center mt-[24px]">
          <div id="btnGroup2" className="relative flex justify-between w-[151px] h-[48px] p-[14px] items-center align-middle border-2 border-hanaSilver rounded-[10px]">
            <p className="text-[12px]">{moment(isStartDate).format("YYYY-MM-DD")}</p>
            <IoCalendarOutline onClick={handleStartToggleCalendar} className="cursor-pointer" />
            {isStartCalendarOpen && (
              <div className="absolute top-[50px] left-0 z-10 bg-white shadow-lg">
                <Calendar
                  onChange={handleStartDateChange}
                  value={isStartDate}
                  maxDate={isEndDate}
                />
              </div>
            )}
          </div>
          <div className="mx-[8px]">-</div>
          <div className="relative flex justify-between w-[151px] h-[48px] p-[14px] items-center align-middle border-2 border-hanaSilver rounded-[10px]">
            <p className="text-[12px]">{moment(isEndDate).format("YYYY-MM-DD")}</p>
            <IoCalendarOutline onClick={handleEndToggleCalendar} className="cursor-pointer" />
            {isEndCalendarOpen && (
              <div className="absolute top-[50px] left-0 z-10 bg-white shadow-lg">
                <Calendar
                  onChange={handleEndDateChange}
                  value={isEndDate}
                  minDate={isStartDate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="py-[24px]">거래구분</p>
        <div className="flex align-middle items-center">
          {entireViewTexts.map((option) => (
            <PeoridBtn
              key={option.month}
              month={option.month}
              description={option.description}
              width="w-[103px]"
              height="h-[30px]"
              selected={entireViewOption === option.month}
              onClick={() => handleEntireViewOption(option.month)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="py-[24px]">정렬순서</p>
        <div className="flex align-middle items-center">
          {orderTexts.map((option) => (
            <PeoridBtn
              key={option.month}
              month={option.month}
              description={option.description}
              width="w-[159px]"
              height="h-[30px]"
              selected={order === option.month}
              onClick={() => handleOrder(option.month)}
            />
          ))}
        </div>
      </div>
      <div className="mt-[32px] flex justify-center">
        <button type="button" onClick={closeModal} className="w-[85px] h-[53px] mr-[16px] bg-hanaSilver text-white rounded-[15px] shadow-xl">취소</button>
        <button type="button" onClick={handleConfirm} className="w-[225px] h-[53px] bg-hanaGreen text-white rounded-[15px] shadow-xl">확인</button>
      </div>
    </div>
  );
}

export default HistoryOptionBoard;
