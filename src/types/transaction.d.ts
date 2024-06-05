interface TransactionType {
  transactionHistory: Array;
  id: number;
  account_id: number;
  user_id: number;
  categoryTitle: string;
  categoryColor: string;
  num: number;
  type: boolean;
  description: string;
  action: number;
  amount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface TransactionDataType {
  transactionHistory: TransactionType[];
}
