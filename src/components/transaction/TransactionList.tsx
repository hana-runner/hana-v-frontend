import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../../types/transaction";
import ApiClient from "../../apis/apiClient";

const TransactionHistoryList: React.FC = () => {
  const { data: userTransactions, isLoading, error } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactions();
      return response;
    },
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(20); // 처음에 보여줄 데이터 수

  useEffect(() => {
    if (userTransactions && Array.isArray(userTransactions.transactionHistory)) {
      const slicedTransactions = userTransactions.transactionHistory.slice(0, visibleCount);
      setTransactions(slicedTransactions);
      console.log("Sliced transactions:", slicedTransactions); // 데이터 로그 추가
    }
  }, [userTransactions, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div className="w-[326px] h-[446px] border-2 rounded-[20px] bg-white mt-[8px] px-[12px] py-[6px] overflow-y-scroll scrollbar-hide">
        {transactions.map((transaction: Transaction, index: number) => (
          <div key={transaction.id ?? index} className="mb-[6px] border-b-2 py-[12px]">
            <div className="text-hanaSilver text-[12px] text-left">
              {new Date(transaction.created_at).toLocaleString()}
            </div>
            <div className="flex justify-between">
              <div className="text-[16px]">{transaction.description}</div>
              <div
                className={
                  transaction.amount >= 0 ? "text-hanaGreen" : "text-hanaRed"
                }
              >
                {transaction.amount.toLocaleString()}
                {" "}
                원
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-[10px]">{transaction.category_id}</div>
              <div className="text-[12px]">
                잔액
                {" "}
                {transaction.balance.toLocaleString()}
                {" "}
                원
              </div>
            </div>
          </div>
        ))}
        {transactions.length < (userTransactions?.transactionHistory.length || 0) && (
          <button
            type="button"
            onClick={loadMore}
            className="p-2 text-hanaSilver rounded"
          >
            + 더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryList;
