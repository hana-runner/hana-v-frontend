export interface transactionType {
  transactionHistory: Array;
  id: number;
  account_id: number;
  user_id: number;
  category_id: number;
  num: number;
  type: boolean;
  description: string;
  action: string;
  amount: number;
  balance: number;
  created_at: string;
  updated_at: string;
}
