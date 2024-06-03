import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MonthNavigationBtn, Navbar } from "../../components";
import { getCookie } from "../../utils/cookie";
import ApiClient from "../../apis/apiClient";

const InterestAnalysis = () => {
  const navigate = useNavigate();
  const { interestId } = useParams();

  const [selected, setSelected] = useState(false);

  const interestTitle = getCookie("interestTitle");

  const [date, setDate] = useState({
    curDate: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { data: userInterestTransactions, refetch } = useQuery<
    BasicResultApiType<UserInterestTransactionsType>
  >({
    queryKey: ["userInterestTransactions"],
    queryFn: () => {
      const response = ApiClient.getInstance().getUserInterestTransactions(
        interestId!,
        date.year,
        date.month,
      );
      return response;
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    if (id === "analysis") {
      setSelected(true);
      navigate(`/interests/analysis/${interestId}/detail`);
    }
    if (id === "transaction") {
      setSelected(false);
      navigate(`/interests/analysis/${interestId}/transaction`);
    }
  };

  const getValues = (date: Date, year: number, month: number) => {
    setDate((prev) => ({ ...prev, curDate: date, year, month }));
  };

  useEffect(() => {
    refetch();
  }, [date.year, date.month]);

  return (
    <section>
      <Navbar
        title={interestTitle}
        option={true}
        path="/interests"
        logo={false}
      />

      {/* 소비 / 거래내역 버튼 */}
      <div className="my-4">
        <button
          type="button"
          id="analysis"
          className={`w-2/5 h-8 rounded-l-md ${selected ? "bg-hanaGreen text-white" : "bg-hanaSilver"}`}
          onClick={handleClick}
        >
          소비
        </button>
        <button
          type="button"
          id="transaction"
          className={`w-2/5 h-8 rounded-r-md ${selected ? "bg-hanaSilver " : "bg-hanaGreen text-white"}`}
          onClick={handleClick}
        >
          거래 내역
        </button>
      </div>

      {/* 총 지출액 */}
      <div className="flex flex-col gap-4 mx-6 rounded-t-md bg-white h-[calc(100vh - 152px)]">
        <MonthNavigationBtn getValues={getValues} />
        {userInterestTransactions?.data.transaction?.length !== 0 ? (
          <div className="flex gap-1">
            <p className="text-left ml-2">{`${userInterestTransactions?.data.interestTotalSpent.toLocaleString("kr-KR")} 원`}</p>
            <p className="flex items-end text-xs text-hanaSliver">{`/${userInterestTransactions?.data.totalSpent.toLocaleString("kr-KR")} 원`}</p>
          </div>
        ) : (
          <div>거래 내역에서 관심사를 지정해 보세요 !</div>
        )}

        <Outlet />
      </div>
    </section>
  );
};

export default InterestAnalysis;
