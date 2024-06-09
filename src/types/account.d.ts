interface AccountInfoType {
  bankName: string;
  accountNumber: string;
}

interface AccountType {
  id: number;
  accountNumber: string;
  balance: number;
  accountName: string;
  accountType: string;
}

interface ExpenseType {
  title: string;
  color: string;
  categoryId: number;
  accountId: number;
  expense: number;
}

interface LegendType {
  title: string;
  ratio: number;
  color: string;
  unit: string;
}

interface InterestExpenseType {
  interestId: number;
  userId: number;
  accountId: number;
  categoryTitle: string;
  expense: number;
  interestTitle: string;
  interestColor: string;
  transactionHistoryId: number;
}
