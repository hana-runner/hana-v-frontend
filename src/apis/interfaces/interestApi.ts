interface interestApi {
  getUserInterests(): Promise<ApiResponseType<UserInterestType[]>>;
  deleteUserInterest(interestId: number): Promise<BaseResponseType>;
  getUserInterestTransactions(
    interestId: number,
    year: number,
    month: number,
  ): Promise<ApiResponseType<UserInterestTransactionsType>>;
  getInterestList(): Promise<ApiResponseType<InterestType[]>>;
  getTransactionsAnalysisFor6(
    interestId: number,
    year: number,
    month: number,
  ): Promise<ApiResponseType<TransactionAnalysisFor6Type>>;
  getInterestComparison(
    interestId: number,
    year: number,
    month: number,
  ): Promise<ApiResponseType<InterestComparisonType[]>>;
  getCardInfo(interestId: number): Promise<ApiResponseType<CardType[]>>;
}

export default interestApi;
