import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";

interface TransactionListProps {
  transactions: TransactionType[];
  loadMore: () => void;
  hasMore: boolean;
}

const TransactionHistoryList: React.FC<TransactionListProps> = ({
  transactions,
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
          return (
            <div
              key={data.id}
              className="mb-[6px] border-b-2 pt-[12px] pb-[16px] cursor-pointer"
              onClick={() => handleClick(data.id)}
            >
              <div className="text-hanaSilver text-[12px] text-left">
                {new Date(data.createdAt).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <div className="text-[16px]">{data.description}</div>
                <div
                  className={
                    data.type === "입금"
                      ? "text-hanaGreen"
                      : data.type === "출금"
                        ? "text-hanaRed"
                        : ""
                  }
                >
                  {`${data.amount.toLocaleString()} 원`}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-row items-center justify-center mt-[8px]">
                  <Tag title={data.categoryTitle} color={data.categoryColor} />
                  {data.transactionHistoryDetails?.map((detail, index) => (
                    <div key={index} className="flex">
                      <Tag
                        title={detail.interest.title}
                        color={detail.interest.color}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-[12px] mt-[8px]">
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
