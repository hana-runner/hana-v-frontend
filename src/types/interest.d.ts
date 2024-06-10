interface UserInterestType {
  interestId: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  color?: string;
}

interface UserInterestTransactionType {
  transactionHistoryId: number;
  description: string;
  color: string;
  bankName: string;
  accountNumber: string;
  amount: number;
  createdAt: Date;
}

interface UserInterestTransactionsType {
  transaction: UserInterestTransactionType[];
  totalSpent: number;
  interestTotalSpent: number;
  interetTitle: string;
  color: string;
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

interface MyMonthType {
  year: number;
  month: number;
  amount: number;
}

interface TransactionAnalysisFor6Type {
  myMonth: MyMonthType[];
  myAverage: number;
  peerAverage: number;
}

interface InterestComparisonType {
  average: number;
  categoryId: number;
  interestId: number;
  categoryTitle: string;
  expense: number;
  interestTitle: string;
  difference: number;
  gender: string;
}

interface CardBenefitsType {
  title: string;
  description: string;
  group: string;
}

interface CardType {
  id: number;
  name: string;
  description: string;
  image: string;
  cardBenefits: CardBenefitsType[];
}

interface DateType {
  curDate: Date;
  year: number;
  month: number;
}
