import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";
import { FiMoreHorizontal } from "react-icons/fi";

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
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const handleClick = (transactionId: number, id: number) => {
    navigate(`/transaction/${transactionId}/detail/${id}`);
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="w-[326px] h-[446px] border-2 rounded-[20px] bg-white mt-[8px] px-[12px] py-[6px] overflow-y-scroll scrollbar-hide">
        {transactions.map((data: TransactionType) => {
          const isExpanded = expanded[data.id] || false;

          // 중복된 interest title 제거
          const uniqueDetails = Array.from(
            new Map(
              data.transactionHistoryDetails.map((detail) => [
                detail.interest.interestId,
                detail,
              ]),
            ).values(),
          );

          const tags = uniqueDetails.map((detail, index) => (
            <div key={index} className="flex">
              <Tag
                title={detail.interest.title}
                color={detail.interest.color}
              />
            </div>
          ));
          const displayedTags = isExpanded ? tags : tags.slice(0, 2);

          return (
            <div
              key={data.id}
              className="mb-[6px] border-b-2 pt-[12px] pb-[16px] cursor-pointer"
              onClick={() => handleClick(data.accountId, data.id)}
            >
              <div className="text-hanaSilver text-[12px] text-left">
                {new Date(data.createdAt).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <div className="text-[16px]">{data.description}</div>
                <div
                  className={
                    data.action === "입금"
                      ? "text-hanaGreen"
                      : data.action === "출금"
                        ? "text-hanaRed"
                        : ""
                  }
                >
                  {`${data.amount.toLocaleString()} 원`}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col mt-[8px] max-w-48">
                  <div className="flex flex-wrap items-center">
                    <Tag
                      title={data.categoryTitle}
                      color={data.categoryColor}
                    />
                    {displayedTags}
                    {tags.length > 2 && !isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(data.id);
                        }}
                        className="ml-2 text-hanaSilver"
                      >
                        <FiMoreHorizontal />
                      </button>
                    )}
                  </div>
                  {isExpanded && (
                    <div className="flex flex-wrap mt-2">{tags.slice(10)}</div>
                  )}
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
