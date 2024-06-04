import { Transaction, transactionType } from "../../types/transaction";

interface transactionApi {
  getTransactions(accountId: number, option: number, sort: string, start: number, end: number): Promise<ApiResponseType<transactionType>>
}

export default transactionApi;
