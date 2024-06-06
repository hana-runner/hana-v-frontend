interface TransactionHistoryApi {
  getTransactionHistory(transactionHistoryId: number): Promise<TransactionType>;
}

export default TransactionHistoryApi;
