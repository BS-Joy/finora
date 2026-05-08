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