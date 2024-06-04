import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { transactionType } from "../../types/transaction";
import ApiClient from "../../apis/apiClient";
import { categoryType } from "../../types/category";
import Tag from "../common/Tag";

const TransactionHistoryList: React.FC = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(20); // 처음에 보여줄 데이터 수
  const navigate = useNavigate();

  // 거래내역 가져오기
  const { data: userTransactions, isLoading, error } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      const response = await ApiClient.getInstance()
        .getTransactions(accountId, option, sort, start, end);
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

  useEffect(() => {
    if (userTransactions && Array.isArray(userTransactions.data.transactionHistory)) {
      const slicedTransactions = userTransactions.data.transactionHistory.slice(0, visibleCount);
      setTransactions(slicedTransactions);
      console.log("Sliced transactions:", slicedTransactions); // 데이터 로그
    }
  }, [userTransactions, visibleCount]);

  useEffect(() => {
    if (categoryList && Array.isArray(categoryList.categories)) {
      setCategories(categoryList.categories);
    }
  }, [categoryList]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleClick = (id: number) => {
    navigate(`/transaction/detail/${id}`);
  };

  // 로딩 중
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div className="w-[326px] h-[446px] border-2 rounded-[20px] bg-white mt-[8px] px-[12px] py-[6px] overflow-y-scroll scrollbar-hide">
        {transactions.map((transaction: transactionType, index: number) => (
          <div
            key={transaction.id ?? index}
            className="mb-[6px] border-b-2 py-[12px] cursor-pointer"
            onClick={() => handleClick(transaction.id)}
          >
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
              <Tag
                title={
                  categories.find((category) => category.id === transaction.category_id)?.title || ""
                }
                color={
                  categories.find((category) => category.id === transaction.category_id)?.color || ""
                }
              />
              <div className="text-[12px] mt-[2px]">
                잔액
                {" "}
                {transaction.balance.toLocaleString()}
                {" "}
                원
              </div>
            </div>
          </div>
        ))}
        {transactions.length < (userTransactions?.data.transactionHistory.length || 0) && (
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
