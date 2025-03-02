
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Transaction, TransactionType, ExpenseCategory, IncomeCategory, generateId } from '@/utils/expenseUtils';
import { toast } from '@/components/ui/use-toast';

interface ExpenseContextType {
  transactions: Transaction[];
  addTransaction: (
    amount: number, 
    category: ExpenseCategory | IncomeCategory, 
    type: TransactionType, 
    note?: string
  ) => void;
  deleteTransaction: (id: string) => void;
  budget: number;
  setBudget: (amount: number) => void;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

const LOCAL_STORAGE_KEY = 'expense-tracker-data';

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<number>(2000);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          
          // Convert string dates back to Date objects
          if (parsedData.transactions) {
            const loadedTransactions = parsedData.transactions.map((t: any) => ({
              ...t,
              date: new Date(t.date)
            }));
            setTransactions(loadedTransactions);
          }
          
          if (parsedData.budget) {
            setBudget(parsedData.budget);
          }
        } else {
          // Initialize with sample data for demo
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          const twoDaysAgo = new Date(today);
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
          
          const sampleTransactions: Transaction[] = [
            {
              id: generateId(),
              amount: 45.99,
              category: 'food',
              date: today,
              note: 'Grocery shopping',
              type: 'expense'
            },
            {
              id: generateId(),
              amount: 25.50,
              category: 'transport',
              date: yesterday,
              note: 'Uber ride',
              type: 'expense'
            },
            {
              id: generateId(),
              amount: 120.00,
              category: 'bills',
              date: twoDaysAgo,
              note: 'Electricity bill',
              type: 'expense'
            },
            {
              id: generateId(),
              amount: 2500.00,
              category: 'salary',
              date: twoDaysAgo,
              note: 'Monthly salary',
              type: 'income'
            }
          ];
          
          setTransactions(sampleTransactions);
        }
      } catch (error) {
        console.error('Error loading data from localStorage', error);
        toast({
          title: 'Error loading data',
          description: 'There was a problem loading your saved data',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    // Simulate a small delay to show loading state (for demo purposes)
    setTimeout(loadData, 500);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
          transactions,
          budget
        }));
      } catch (error) {
        console.error('Error saving data to localStorage', error);
        toast({
          title: 'Error saving data',
          description: 'There was a problem saving your data',
          variant: 'destructive'
        });
      }
    }
  }, [transactions, budget, isLoading]);

  const addTransaction = (
    amount: number, 
    category: ExpenseCategory | IncomeCategory, 
    type: TransactionType, 
    note?: string
  ) => {
    const newTransaction: Transaction = {
      id: generateId(),
      amount,
      category,
      date: new Date(),
      note,
      type
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    
    toast({
      title: `${type === 'expense' ? 'Expense' : 'Income'} added`,
      description: `${type === 'expense' ? 'Expense' : 'Income'} of $${amount.toFixed(2)} has been added`
    });
    
    return newTransaction;
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    
    toast({
      title: 'Transaction deleted',
      description: 'The transaction has been removed'
    });
  };

  const updateBudget = (amount: number) => {
    setBudget(amount);
    
    toast({
      title: 'Budget updated',
      description: `Your monthly budget has been set to $${amount.toFixed(2)}`
    });
  };

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    budget,
    setBudget: updateBudget,
    isLoading
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
