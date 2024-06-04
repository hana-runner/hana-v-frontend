import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HistoryOption from "../../components/transaction/HistoryOption";
import {
  TransactionList, Navbar, AccountBoard, Loading,
} from "../../components";
import ApiClient from "../../apis/apiClient";

function Transaction() {
  const accountId = 0;
  const today = new Date();
  const [option, setOption] = useState<number>(0);
  const [sort, setSort] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(today);
  const [visibleCount, setVisibleCount] = useState<number>(20); // 처음에 보여줄 데이터 수

  // 거래내역 가져오기
  const { data: userTransactions, isLoading, error } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      const response = await ApiClient.getInstance()
        .getTransactions(accountId, option, sort, startDate, endDate);
      return response;
    },
  });

  // 일반 카테고리 가져오기
  const { data: categoryList } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getCategories();
      return response;
    },
  });

  const transactions = userTransactions?.data.transactionHistory.slice(0, visibleCount) || [];
  const categories = categoryList?.categories || [];

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <section className="flex flex-col items-center flex-wrap">
      <Navbar title="거래내역조회" option={true} logo={false} />
      <AccountBoard />
      <HistoryOption
        option={option}
        startDate={startDate}
        endDate={endDate}
        sort={sort}
        setOption={setOption}
        setSort={setSort}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <TransactionList
        transactions={transactions}
        categories={categories}
        loadMore={loadMore}
        hasMore={transactions.length < (userTransactions?.data.transactionHistory.length || 0)}
      />
    </section>
  );
}

export default Transaction;
