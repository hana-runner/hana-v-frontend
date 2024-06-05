import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";

interface TransactionListProps {
  transactions: TransactionType[];
  categories: CategoryType[];
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
        {transactions.map((data: TransactionType) => {
          // 카테고리 검색해서 일반 카테고리 태그 띄워주기
          const category = categories.find((c) => c.id === data.category_id);

          console.log("Transaction:", data);
          console.log("Category found:", category);

          return (
            <div
              key={data.id} // 고유한 key 추가
              className="mb-[6px] border-b-2 py-[12px] cursor-pointer"
              onClick={() => handleClick(data.id)}
            >
              <div className="text-hanaSilver text-[12px] text-left">
                {new Date(data.created_at).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <div className="text-[16px]">{data.description}</div>
                <div
                  className={
                    data.amount >= 0 ? "text-hanaGreen" : "text-hanaRed"
                  }
                >
                  {`${data.amount.toLocaleString()} 원`}
                </div>
              </div>
              <div className="flex justify-between">
                {category && (
                  <Tag title={category.title} color={category.color} />
                )}
                <div className="text-[12px] mt-[2px]">
                  {`잔액 ${data.balance.toLocaleString()} 원`}
                </div>
              </div>
            </div>
          );
        })}
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
