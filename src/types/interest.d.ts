interface UserInterestType {
  interestId: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
}

interface UserInterestTransactionType {
  transactionHistoryId: number;
  description: string;
  bankName: string;
  accountNumber: string;
  amount: number;
  createdAt: Date;
}

interface UserInterestTransactionsType {
  transaction: UserInterestTransactionType[];
  totalSpent: number;
  interestTotalSpent: number;
}

interface InterestType {
  interestId: number;
  title: string;
  description: string;
  color: string;
}

interface NewUserInterestType {
  interestId: number;
  title: string;
  description: string;
  imageUrl: string;
}
