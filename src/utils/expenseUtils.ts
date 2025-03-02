
import { format } from 'date-fns';

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'bills' 
  | 'shopping' 
  | 'entertainment' 
  | 'health' 
  | 'education' 
  | 'other';

export type IncomeCategory = 
  | 'salary' 
  | 'business' 
  | 'investment' 
  | 'gift' 
  | 'other';

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  amount: number;
  category: ExpenseCategory | IncomeCategory;
  date: Date;
  note?: string;
  type: TransactionType;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const getExpenseCategories = (): ExpenseCategory[] => {
  return ['food', 'transport', 'bills', 'shopping', 'entertainment', 'health', 'education', 'other'];
};

export const getIncomeCategories = (): IncomeCategory[] => {
  return ['salary', 'business', 'investment', 'gift', 'other'];
};

export const getCategoryColor = (category: ExpenseCategory | IncomeCategory): string => {
  const colors: Record<ExpenseCategory | IncomeCategory, string> = {
    food: '#FF6B6B',
    transport: '#4ECDC4',
    bills: '#FFD166',
    shopping: '#F78FB3',
    entertainment: '#6A0572',
    health: '#1FDA9A',
    education: '#4A90E2',
    other: '#7F8C8D',
    salary: '#2ECC71',
    business: '#3498DB',
    investment: '#9B59B6',
    gift: '#F1C40F',
  };

  return colors[category] || colors.other;
};

export const getTotalByType = (transactions: Transaction[], type: TransactionType): number => {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getRecentTransactions = (transactions: Transaction[], limit: number = 5): Transaction[] => {
  return [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};

export const groupTransactionsByCategory = (transactions: Transaction[]): Record<string, number> => {
  return transactions.reduce((grouped, transaction) => {
    const { category, amount } = transaction;
    grouped[category] = (grouped[category] || 0) + amount;
    return grouped;
  }, {} as Record<string, number>);
};

export const groupTransactionsByDate = (transactions: Transaction[], dateFormat = 'MMM dd'): Record<string, number> => {
  return transactions.reduce((grouped, transaction) => {
    const dateKey = format(transaction.date, dateFormat);
    grouped[dateKey] = (grouped[dateKey] || 0) + transaction.amount;
    return grouped;
  }, {} as Record<string, number>);
};

export const getCategoryDisplayName = (category: ExpenseCategory | IncomeCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export const getDailyTransactions = (transactions: Transaction[]): Record<string, number> => {
  return groupTransactionsByDate(transactions, 'MMM dd');
};

export const getWeeklyTransactions = (transactions: Transaction[]): Record<string, number> => {
  return groupTransactionsByDate(transactions, 'w');
};

export const getMonthlyTransactions = (transactions: Transaction[]): Record<string, number> => {
  return groupTransactionsByDate(transactions, 'MMM');
};

export const calculateRemainingBudget = (budget: number, expenses: number): number => {
  return Math.max(0, budget - expenses);
};

export const getExpenseTrend = (transactions: Transaction[], days = 7): Record<string, number> => {
  const now = new Date();
  const pastDays: Record<string, number> = {};
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    pastDays[format(date, 'MMM dd')] = 0;
  }
  
  const expensesByDay = transactions
    .filter(t => t.type === 'expense' && t.date >= new Date(now.setDate(now.getDate() - days)))
    .reduce((acc, transaction) => {
      const day = format(transaction.date, 'MMM dd');
      acc[day] = (acc[day] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  
  return { ...pastDays, ...expensesByDay };
};
