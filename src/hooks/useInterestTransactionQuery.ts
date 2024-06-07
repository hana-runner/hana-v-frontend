import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apis/apiClient";

const userInterestTransactionsQuery = (
  interestId: number,
  year: number,
  month: number,
) => {
  const {
    isLoading,
    data: userInterestTransactions,
    refetch,
  } = useQuery<ApiResponseType<UserInterestTransactionsType>>({
    queryKey: ["userInterestTransactions"],
    queryFn: () => {
      const response = ApiClient.getInstance().getUserInterestTransactions(
        interestId,
        year,
        month,
      );
      return response;
    },
  });

  return { isLoading, userInterestTransactions, refetch };
};

export default userInterestTransactionsQuery;
