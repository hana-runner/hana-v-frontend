import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transaction } from "../types/transactionHistory";

const TransactionHistoryList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(20); // 처음에 보여줄 데이터 수

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const apiUrl = "/transactionListData.json"; // public 디렉토리의 JSON 파일 경로
      try {
        const response = await axios.get(apiUrl);

        if (response.data && Array.isArray(response.data.transactionHistory)) {
          setAllTransactions(response.data.transactionHistory);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, []);

  useEffect(() => {
    if (allTransactions.length > 0) {
      setTransactions(allTransactions.slice(0, visibleCount));
    }
  }, [visibleCount, allTransactions]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="w-[326px] h-[446px] border-2 rounded-[20px] bg-white mt-[8px] px-[12px] py-[6px] overflow-y-scroll scrollbar-hide">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="mb-[6px] border-b-2 py-[12px]">
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
        {transactions.length < allTransactions.length && (
        <button type="button" onClick={loadMore} className="p-2 text-hanaSilver rounded">
          + 더보기
        </button>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryList;
