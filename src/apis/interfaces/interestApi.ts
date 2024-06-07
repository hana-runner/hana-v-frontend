interface interestApi {
  getUserInterests(): Promise<BasicResultApiType<UserInterestType[]>>;
  getUserInterestTransactions(
    interestId: string,
    year: number,
    month: number,
  ): Promise<BasicResultApiType<UserInterestTransactionsType>>;
  getInterestList(): Promise<BasicResultApiType<InterestType[]>>;
}

export default interestApi;
