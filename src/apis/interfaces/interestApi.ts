interface interestApi {
  getUserInterests(): Promise<ApiResponseType<UserInterestType[]>>;
  getUserInterestTransactions(
    interestId: number,
    year: number,
    month: number,
  ): Promise<ApiResponseType<UserInterestTransactionsType>>;
  getInterestList(): Promise<ApiResponseType<InterestType[]>>;
}

export default interestApi;
