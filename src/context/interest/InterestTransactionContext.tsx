import { createContext, useContext } from "react";
import userInterestTransactionsQuery from "../../hooks/useInterestTransactionQuery";

interface InterestTransactionContextType {
  isLoading: boolean;
  userInterestTransactions: ApiResponseType<UserInterestTransactionsType>;
}

const InterestTransactionContext =
  createContext<InterestTransactionContextType>({
    isLoading: false,
    userInterestTransactions: {
      code: "",
      message: "",
      data: {
        interestTotalSpent: 0,
        totalSpent: 0,
        transaction: [
          {
            transactionHistoryId: 0,
            description: "",
            bankName: "",
            accountNumber: "",
            amount: 0,
            createdAt: new Date(),
          },
        ],
      },
      status: 0,
      success: false,
      timestamp: "",
    },
  });

export const InterestTransactionContextProvider = ({
  interestId,
  year,
  month,
  children,
}: {
  interestId: number;
  year: number;
  month: number;
  children: React.ReactNode;
}) => {
  const { isLoading, userInterestTransactions } = userInterestTransactionsQuery(
    Number(interestId),
    year,
    month,
  );

  console.log(userInterestTransactions);

  return (
    <InterestTransactionContext.Provider
      value={{ isLoading, userInterestTransactions }}
    >
      {children}
    </InterestTransactionContext.Provider>
  );
};

export const useInterestTransaction = () => {
  return useContext(InterestTransactionContext);
};
