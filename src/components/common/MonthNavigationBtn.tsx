import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import calculateDate from "../../utils/date";

interface MonthNavigationBtnType {
  getValues: (date: Date, year: number, month: number) => void;
}

const MonthNavigationBtn = ({ getValues }: MonthNavigationBtnType) => {
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { year, month } = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  }, [date]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    if (id === "back") {
      setButtonDisabled(false);
      setDate(new Date(calculateDate.subtractMonth(date)));
    }
    if (id === "forward") {
      setDate(new Date(calculateDate.addMonth(date)));
    }
  };

  useEffect(() => {
    if (date.getMonth() + 1 >= new Date().getMonth() + 1) {
      setButtonDisabled(true);
    }
    getValues(date, year, month);
  }, [date]);

  return (
    <div className="flex items-center gap-2">
      <button id="back" type="button" onClick={handleClick}>
        <IoIosArrowBack />
      </button>

      <p>{`${year}년 ${month}월`}</p>
      <button
        id="forward"
        type="button"
        onClick={handleClick}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? (
          <IoIosArrowForward color="B5B5B5" />
        ) : (
          <IoIosArrowForward />
        )}
      </button>
    </div>
  );
};

export default MonthNavigationBtn;
