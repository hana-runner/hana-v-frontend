import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import userInterestTransactionsQuery from "../../hooks/useInterestTransactionQuery";
import { Loading, MonthNavigationBtn, Navbar } from "../../components";

const InterestAnalysis = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { interestTitle, interestId } = useParams();

  const [selected, setSelected] = useState(true);

  const [date, setDate] = useState({
    curDate: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { isLoading, userInterestTransactions } = userInterestTransactionsQuery(
    Number(interestId),
    date.year,
    date.month,
  );

  if (isLoading) {
    <Loading />;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    if (id === "analysis") {
      setSelected(true);
      navigate(`/interests/analysis/${interestTitle}/${interestId}/detail`);
    }
    if (id === "transaction") {
      setSelected(false);
      navigate(
        `/interests/analysis/${interestTitle}/${interestId}/transaction`,
      );
    }
  };

  const getValues = (date: Date, year: number, month: number) => {
    setDate((prev) => ({ ...prev, curDate: date, year, month }));
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["userInterestTransactions"] });
    if (window.location.href.includes("detail")) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [date.year, date.month]);

  return (
    <section className="h-screen flex flex-col">
      <Navbar
        title={interestTitle!}
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
      <div className="flex flex-col flex-grow gap-4 px-6 py-4 rounded-t-3xl bg-white">
        <MonthNavigationBtn getValues={getValues} />
        <div className="flex gap-1">
          <p className="text-left ml-2">{`${userInterestTransactions?.data.interestTotalSpent.toLocaleString("kr-KR")} 원`}</p>
          <p className="flex items-end text-xs text-hanaSliver">{`/${userInterestTransactions?.data.totalSpent.toLocaleString("kr-KR")} 원`}</p>
        </div>

        <Outlet context={[userInterestTransactions, date]} />
      </div>
    </section>
  );
};

export default InterestAnalysis;
