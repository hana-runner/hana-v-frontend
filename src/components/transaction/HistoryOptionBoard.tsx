import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PeriodBtn from "../common/PeriodBtn";
import calculateDate from "../../utils/calculateDate";

interface HistoryOptionBoardProps {
  closeModal: () => void;
  confirmDate: (start: Date, end: Date, period: number | undefined) => void;
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
  const [selectedPeriod, setSelectedPeriod] = useState<number | undefined>(
    undefined,
  );
  const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setEndCalendarOpen] = useState(false);

  // 현재 board의 state 관리
  const [selectStartDate, setSelectStartDate] = useState<Date>(startDate);
  const [selectEndDate, setSelectEndDate] = useState<Date>(endDate);
  const [selectOption, setSelectOption] = useState<number>(option);
  const [selectSort, setSelectSort] = useState<boolean>(sort);

  const handleStartToggleCalendar = () => {
    setStartCalendarOpen(!isStartCalendarOpen);
    if (isEndCalendarOpen) setEndCalendarOpen(false);
  };

  const handleEndToggleCalendar = () => {
    setEndCalendarOpen(!isEndCalendarOpen);
    if (isStartCalendarOpen) setStartCalendarOpen(false);
  };

  const handleStartDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectStartDate(value);
      setSelectedPeriod(undefined);
      setStartCalendarOpen(false);
    }
  };

  const handleEndDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectEndDate(value);
      setEndCalendarOpen(false);
    }
  };

  const handleConfirm = () => {
    setStartDate(selectStartDate);
    setEndDate(selectEndDate);
    setOption(selectOption);
    setSort(selectSort);
    confirmDate(selectStartDate, selectEndDate, selectedPeriod);
    confirmOption(selectedPeriod, selectOption, selectSort);
    closeModal();
  };

  const handlePeriod = (month: number) => {
    setSelectStartDate(calculateDate.monthAgo(selectEndDate, month));
    setSelectedPeriod(month);
  };

  const handleEntireViewOption = (entireView: number) => {
    setSelectOption(entireView);
  };

  const handleOrder = (orderOption: boolean) => {
    setSelectSort(orderOption);
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
    { month: 1, description: "최신순" },
    { month: 0, description: "과거순" },
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
              {moment(selectStartDate).format("YYYY-MM-DD")}
            </p>
            <IoCalendarOutline
              onClick={handleStartToggleCalendar}
              className="cursor-pointer"
            />
            {isStartCalendarOpen && (
              <div className="absolute top-[50px] left-0 z-10 bg-white shadow-lg">
                <Calendar
                  onChange={handleStartDateChange}
                  value={selectStartDate}
                  maxDate={selectEndDate}
                  locale="en-US"
                  formatDay={(locale, date) => moment(date).format("DD")}
                />
              </div>
            )}
          </div>
          <div className="mx-[8px]">-</div>
          <div className="relative flex justify-between w-[151px] h-[48px] p-[14px] items-center align-middle border-2 border-hanaSilver rounded-[10px]">
            <p className="text-[12px]">
              {moment(selectEndDate).format("YYYY-MM-DD")}
            </p>
            <IoCalendarOutline
              onClick={handleEndToggleCalendar}
              className="cursor-pointer"
            />
            {isEndCalendarOpen && (
              <div className="absolute top-[50px] left-auto right-0 z-10 bg-white shadow-lg">
                <Calendar
                  onChange={handleEndDateChange}
                  value={selectEndDate}
                  minDate={selectStartDate}
                  locale="en-US"
                  formatDay={(locale, date) => moment(date).format("DD")}
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
              selected={selectOption === opt.month}
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
              selected={Number(selectSort) === opt.month}
              onClick={() => handleOrder(Boolean(opt.month))}
            />
          ))}
        </div>
      </div>
      <div className="mt-[32px] flex justify-center">
        <button
          type="button"
          onClick={closeModal}
          className="w-[155px] h-[53px] mr-[16px] bg-hanaSilver text-white rounded-[15px]"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="w-[155px] h-[53px] bg-hanaGreen text-white rounded-[15px]"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default HistoryOptionBoard;
