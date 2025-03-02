
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Transaction, 
  formatCurrency, 
  formatDate, 
  getCategoryDisplayName,
  getRecentTransactions
} from '@/utils/expenseUtils';
import CategoryIcon from './CategoryIcon';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useExpenseContext } from '@/context/ExpenseContext';

interface ExpenseListProps {
  transactions?: Transaction[];
  limit?: number;
  showDelete?: boolean;
  className?: string;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  transactions: propTransactions, 
  limit = 5,
  showDelete = true,
  className
}) => {
  const { transactions: contextTransactions, deleteTransaction } = useExpenseContext();
  const transactions = propTransactions || contextTransactions;
  
  const recentTransactions = getRecentTransactions(transactions, limit);
  
  if (recentTransactions.length === 0) {
    return (
      <Card className={cn("w-full animate-fade-in", className)}>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>No transactions yet</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-muted-foreground p-6">
          Add your first transaction to see it here
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn("w-full animate-fade-in", className)}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-muted/40 transition-all-fast"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    transaction.type === 'expense' 
                      ? "bg-expense/10 text-expense" 
                      : "bg-income/10 text-income"
                  )}
                >
                  <CategoryIcon category={transaction.category} size={20} />
                </div>
                <div>
                  <div className="font-medium">
                    {getCategoryDisplayName(transaction.category)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                    {transaction.note && ` • ${transaction.note}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span 
                  className={cn(
                    "font-medium",
                    transaction.type === 'expense' ? "text-expense" : "text-income"
                  )}
                >
                  {transaction.type === 'expense' ? '-' : '+'}
                  {formatCurrency(transaction.amount)}
                </span>
                
                {showDelete && (
                  <button 
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-muted-foreground hover:text-destructive transition-all-fast p-1"
                    aria-label="Delete transaction"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
