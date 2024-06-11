import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const InterestTransaction = () => {
  const { userInterestTransactions, date } = useOutletContext();

  if (userInterestTransactions?.data.interestTotalSpent === 0) {
    return <div>지출한 금액이 없습니다.</div>;
  }

  useEffect(() => {
    console.log(userInterestTransactions);
  }, [userInterestTransactions]);

  return (
    <ul className="flex flex-col px-6 border border-hanaSilver rounded-3xl">
      {userInterestTransactions?.data.transaction.map(
        (transaction: UserInterestTransactionType, idx: number) => (
          <li
            key={transaction.transactionHistoryId}
            className={`${
              idx !== userInterestTransactions.data.transaction.length - 1
                ? "border-b border-hanaSilver"
                : ""
            }`}
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
    </ul>
  );
};

export default InterestTransaction;
