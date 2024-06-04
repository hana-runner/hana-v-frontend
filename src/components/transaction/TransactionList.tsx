import React from "react";
// import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { transactionType } from "../../types/transaction";
// import ApiClient from "../../apis/apiClient";
// import { categoryType } from "../../types/category";
import Tag from "../common/Tag";
import { categoryType } from "../../types/category";

interface TransactionListProps {
  transactions: transactionType[];
  categories: categoryType[];
  loadMore: () => void;
  hasMore: boolean;
}

const TransactionHistoryList: React.FC<TransactionListProps> = ({
  transactions,
  categories,
  loadMore,
  hasMore,
}) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/transaction/detail/${id}`);
  };

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
        {hasMore && (
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
