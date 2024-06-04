import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PeriodBtn from "../common/PeriodBtn";
import calculateDate from "../../utils/calculateDate";

// 매개변수 타입 정의
interface HistoryOptionBoardProps {
  closeModal: () => void;
  confirmDate: (
    start: Date,
    end: Date,
    period: number | undefined,
  ) => void;
  confirmOption: (
    period: number | undefined,
    option: number,
    order: boolean,
  ) => void;
  startDate: Date;
  endDate: Date;
  option: number;
  sort: boolean;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setOption: (value: number) => void;
  setSort: (value: boolean) => void;
}

function HistoryOptionBoard({
  closeModal,
  confirmDate,
  confirmOption,
  startDate,
  endDate,
  option,
  sort,
  setStartDate,
  setEndDate,
  setOption,
  setSort,
}: HistoryOptionBoardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<number | undefined>(undefined);
  const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setEndCalendarOpen] = useState(false);

  const handleStartToggleCalendar = () => {
    setStartCalendarOpen(!isStartCalendarOpen);
    if (isEndCalendarOpen) setEndCalendarOpen(false); // Close end calendar if it's open
  };

  const handleEndToggleCalendar = () => {
    setEndCalendarOpen(!isEndCalendarOpen);
    if (isStartCalendarOpen) setStartCalendarOpen(false); // Close start calendar if it's open
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
    confirmDate(startDate, endDate, selectedPeriod);
    confirmOption(selectedPeriod, option, sort);
    closeModal();
  };

  const handlePeriod = (month: number) => {
    setStartDate(calculateDate.monthAgo(endDate, month));
    setSelectedPeriod(month);
  };

  const handleEntireViewOption = (entireView: number) => {
    setOption(entireView);
  };

  const handleOrder = (orderOption: boolean) => {
    setSort(orderOption);
  };

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
          {periodOptions.map((opt) => (
            <PeriodBtn
              key={opt.month}
              month={opt.month}
              description={opt.description}
              width="w-[76px]"
              height="h-[25px]"
              selected={selectedPeriod === opt.month}
              onClick={() => handlePeriod(opt.month)}
            />
          ))}
        </div>
        <div className="flex items-center mt-[24px]">
          <div
            id="btnGroup2"
            className="relative flex justify-between w-[151px] h-[48px] p-[14px] items-center align-middle border-2 border-hanaSilver rounded-[10px]"
          >
            <p className="text-[12px]">
              {moment(startDate).format("YYYY-MM-DD")}
            </p>
            <IoCalendarOutline
              onClick={handleStartToggleCalendar}
              className="cursor-pointer"
            />
            {isStartCalendarOpen && (
              <div className="absolute top-[50px] left-0 z-10 bg-white shadow-lg">
                <Calendar
                  onChange={handleStartDateChange}
                  value={startDate}
                  maxDate={endDate}
                  locale="en-US" // 일요일부터 시작
                  formatDay={(locale, date) => moment(date).format("DD")} // 숫자만 보여주기
                />
              </div>
            )}
          </div>
          <div className="mx-[8px]">-</div>
          <div className="relative flex justify-between w-[151px] h-[48px] p-[14px] items-center align-middle border-2 border-hanaSilver rounded-[10px]">
            <p className="text-[12px]">
              {moment(endDate).format("YYYY-MM-DD")}
            </p>
            <IoCalendarOutline
              onClick={handleEndToggleCalendar}
              className="cursor-pointer"
            />
            {isEndCalendarOpen && (
              <div className="absolute top-[50px] left-auto right-0 z-10 bg-white shadow-lg">
                <Calendar
                  onChange={handleEndDateChange}
                  value={endDate}
                  minDate={startDate}
                  locale="en-US" // 일요일부터 시작
                  formatDay={(locale, date) => moment(date).format("DD")} // 숫자만 보여주기
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="py-[24px]">거래구분</p>
        <div className="flex align-middle items-center">
          {entireViewTexts.map((opt) => (
            <PeriodBtn
              key={opt.month}
              month={opt.month}
              description={opt.description}
              width="w-[103px]"
              height="h-[30px]"
              selected={option === opt.month}
              onClick={() => handleEntireViewOption(opt.month)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="py-[24px]">정렬순서</p>
        <div className="flex align-middle items-center">
          {orderTexts.map((opt) => (
            <PeriodBtn
              key={opt.month}
              month={opt.month}
              description={opt.description}
              width="w-[159px]"
              height="h-[30px]"
              selected={Number(sort) === opt.month}
              onClick={() => handleOrder(Boolean(opt.month))}
            />
          ))}
        </div>
      </div>
      <div className="mt-[32px] flex justify-center">
        <button
          type="button"
          onClick={closeModal}
          className="w-[85px] h-[53px] mr-[16px] bg-hanaSilver text-white rounded-[15px] shadow-xl"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="w-[225px] h-[53px] bg-hanaGreen text-white rounded-[15px] shadow-xl"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default HistoryOptionBoard;
