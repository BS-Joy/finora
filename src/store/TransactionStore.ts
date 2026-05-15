import type { CategorySchema } from "@/types";
import { create } from "zustand";

type TransactionState = {
    categories: CategorySchema[];
    setCategories: (categories: CategorySchema[]) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
    categories: [],
    setCategories: (categories) => {
        set({categories})
    }
}))