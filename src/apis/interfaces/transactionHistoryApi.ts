interface TransactionHistoryApi {
  getTransactionHistory(
    transactionHistoryId: number,
  ): Promise<ApiResponseType<TransactionType>>;
}

export default TransactionHistoryApi;
