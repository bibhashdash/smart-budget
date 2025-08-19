import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BudgetCategories = {
  0: "Groceries",
  1: "Insurances",
  2: "Bills",
  3: "Entertainment",
  4: "Health",
  5: "Telecommunication",
  6: "Dining",
  7: "Vehicles",
  8: "Savings",
  9: "Other",
}

export interface Transaction {
  accountId: string;
  amount: number;
  budgetCategory: number;
  budgetName: string;
  date: Date;
}

export interface Account {
  accountId: string;
  accountName: string;
  balance: number;
  isMain: boolean;
}

export interface Budget {
  value: number;
  category: number;
  id: string;
  startDate: Date;
  endDate: Date;
  lineItems?: Array<BudgetLineItem>;
}

export interface BudgetLineItem {
  name: string;
  value: number;
}