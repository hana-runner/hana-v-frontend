interface transactionApi {
  getTransactions(
    accountId: number,
    option: number,
    sort: boolean,
    start: Date,
    end: Date,
  ): Promise<ApiResponseType<TransactionType[]>>;
}

export default transactionApi;
