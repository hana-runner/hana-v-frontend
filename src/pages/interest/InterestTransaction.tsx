import { useEffect, useState, useTransition } from "react";
import { useOutletContext } from "react-router-dom";

const InterestTransaction = () => {
  const [visibleCount, setVisibleCount] = useState(20);

  const { userInterestTransactions } = useOutletContext<{
    userInterestTransactions: {
      data: {
        interestTotalSpent: number;
        transaction: UserInterestTransactionType[];
      };
    };
  }>();

  const transactions = userInterestTransactions.data.transaction.slice(
    0,
    visibleCount,
  );

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  if (userInterestTransactions?.data.interestTotalSpent === 0) {
    return <div>지출한 금액이 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col px-6 border border-hanaSilver rounded-3xl">
      {transactions.map(
        (transaction: UserInterestTransactionType, idx: number) => (
          <li
            key={transaction.transactionHistoryId}
            className={`${idx !== transactions.length - 1 ? "border-b border-hanaSilver" : ""}`}
          >
            <div className="my-6">
              <div className="text-[12px] text-hanaSilver text-left">
                {new Date(transaction.createdAt).toLocaleString()}
              </div>
              <div className="flex w-full">
                <div className="w-4/6 line-clamp-1 text-left">
                  {transaction.description}
                </div>
                <div className="w-2/6 text-right text-hanaRed font-hanaMedium">
                  -{transaction.amount.toLocaleString("KR-kr")}원
                </div>
              </div>
              <div className="text-[12px] text-hanaSilver text-right">
                {transaction.accountNumber}
              </div>
            </div>
          </li>
        ),
      )}
      {visibleCount < userInterestTransactions.data.transaction.length && (
        <button
          type="button"
          onClick={loadMore}
          className="p-2 text-hanaSilver rounded"
        >
          + 더보기
        </button>
      )}
    </ul>
  );
};

export default InterestTransaction;
