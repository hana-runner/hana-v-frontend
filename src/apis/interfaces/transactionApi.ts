import { transactionType } from "../../types/transaction";

interface transactionApi {
  getTransactions(
    accountId: number,
    option: number,
    sort: boolean,
    start: Date,
    end: Date
  ): Promise<ApiResponseType<transactionType>>
}

export default transactionApi;
