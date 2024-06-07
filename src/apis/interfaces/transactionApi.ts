import { Transaction } from "../../types/transaction";

interface transactionApi {
  getTransactions(): Promise<Transaction>;
}

export default transactionApi;
