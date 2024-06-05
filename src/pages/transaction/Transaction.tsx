import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HistoryOption from "../../components/transaction/HistoryOption";
import {
  TransactionList,
  Navbar,
  AccountBoard,
  Loading,
} from "../../components";
import ApiClient from "../../apis/apiClient";
import calculateDate from "../../utils/CalculateDate"; // 유틸리티 함수를 가져옵니다

function Transaction() {
  const accountId = 1;
  const today = new Date();
  const [option, setOption] = useState<number>(0);
  const [sort, setSort] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>(today); // default 종료일 오늘 날짜
  const [visibleCount, setVisibleCount] = useState<number>(20); // 처음에 보여줄 데이터 수

  // 시작일 계산
  const result = calculateDate.monthAgo(endDate, 6); // 시작일은 종료일로부터 6개월 전입니다
  const [startDate, setStartDate] = useState<Date>(result);

  // 거래내역 가져오기
  const {
    data: userTransactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userTransactions", accountId, option, sort, startDate, endDate],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactions(
        accountId,
        option,
        sort,
        startDate,
        endDate,
      );
      return response;
    },
  });

  // 일반 카테고리 가져오기
  const { data: categoryList } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await ApiClient.getCategories();
      return response;
    },
  });

  const transactions = userTransactions?.data || [];
  const useTransactionData = transactions.slice(0, visibleCount); // 배열 잘라서 새로운 배열 생성

  const categories = categoryList?.categories || [];

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
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
        transactions={useTransactionData}
        categories={categories}
        loadMore={loadMore}
        hasMore={useTransactionData.length < transactions.length}
      />
    </section>
  );
}

export default Transaction;
