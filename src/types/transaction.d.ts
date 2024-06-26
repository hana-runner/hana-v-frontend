interface TransactionType {
  transactionHistory: Array;
  transactionHistoryDetails: Array;
  id: number;
  accountId: number;
  user_id: number;
  categoryTitle: string;
  categoryColor: string;
  approvalNumber: number;
  num: number;
  type: number;
  description: string;
  action: string;
  amount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface TransactionDataType {
  transactionHistory: TransactionType[];
}

interface TransactionInterestDetail {
  id: number;
  interestId: number;
  title: string;
  amount: number;
  description: string;
}
