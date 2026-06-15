export interface UserProfileSchema {
  id: string;
  user_id: string;
  currency: string;
  created_at?: string;
  updated_at?: string;
}

export interface WalletSchema {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  description?: string;
  current_balance: number;
  total_income: number;
  total_expense: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategorySchema {
  id: string;
  user_id: string | null;
  name: string;
  type: string;
  color: string;
  icon: string;
}

export type TransactionType = "income" | "expense";

export interface TransactionSchema {
  id: string;
  user_id: string;
  wallet_id: string;
  category_id: string;
  amount: number;
  type: TransactionType;
  title: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TransactionWithCategory extends TransactionSchema {
  category: CategorySchema;
}
