
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseContext } from '@/context/ExpenseContext';
import { 
  formatCurrency, 
  getTotalByType, 
  getExpenseTrend,
  calculateRemainingBudget
} from '@/utils/expenseUtils';
import { PieChart, PieArcDatum } from 'recharts';
import { Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { ArrowDown, ArrowUp, Wallet, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { transactions, budget, isLoading } = useExpenseContext();
  
  const totalExpense = getTotalByType(transactions, 'expense');
  const totalIncome = getTotalByType(transactions, 'income');
  const balance = totalIncome - totalExpense;
  const budgetRemaining = calculateRemainingBudget(budget, totalExpense);
  const budgetPercentage = budget > 0 ? Math.min(100, (totalExpense / budget) * 100) : 0;
  
  const expenseTrendData = getExpenseTrend(transactions);
  const trendArray = Object.entries(expenseTrendData).map(([name, value]) => ({ 
    name, 
    value 
  }));
  
  // Prepare data for pie chart
  const expenseData = [
    { name: 'Spent', value: totalExpense },
    { name: 'Remaining', value: Math.max(0, budgetRemaining) }
  ];
  
  const COLORS = ['#FF6B6B', '#4ECDC4'];

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[300px] animate-pulse">
        <div className="w-12 h-12 rounded-full bg-primary/20 mb-4"></div>
        <div className="h-4 w-48 bg-muted rounded mb-3"></div>
        <div className="h-3 w-32 bg-muted/60 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          title="Total Expenses"
          value={formatCurrency(totalExpense)}
          icon={<ArrowDown className="text-expense" />}
          trend="+5% from last month"
          trendUp={false}
          className="bg-gradient-to-br from-background to-expense/5"
        />
        <StatCard 
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<ArrowUp className="text-income" />}
          trend="+12% from last month"
          trendUp={true}
          className="bg-gradient-to-br from-background to-income/5"
        />
      </div>
      
      <StatCard 
        title="Current Balance"
        value={formatCurrency(balance)}
        icon={<Wallet />}
        trend="Based on all transactions"
        trendUp={balance >= 0}
        className="bg-gradient-to-br from-primary/5 to-background card-glass"
        contentClassName="flex flex-col items-center"
      />
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Budget Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monthly Budget</span>
            <span className="font-medium">{formatCurrency(budget)}</span>
          </div>
          <Progress value={budgetPercentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm mt-1">
            <span className={budgetRemaining > 0 ? "text-income" : "text-expense"}>
              {budgetRemaining > 0 
                ? `${formatCurrency(budgetRemaining)} remaining` 
                : `Over budget by ${formatCurrency(Math.abs(budgetRemaining))}`}
            </span>
            <span className="text-muted-foreground">{budgetPercentage.toFixed(0)}%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Expense Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendArray}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Spent']}
                  contentStyle={{
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  animationDuration={1500}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), entry => entry.name]}
                  contentStyle={{
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center mt-2 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FF6B6B] mr-2"></div>
              <span className="text-sm">Spent</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#4ECDC4] mr-2"></div>
              <span className="text-sm">Remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  className?: string;
  contentClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp,
  className,
  contentClassName
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className={cn("pt-6", contentClassName)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="text-2xl font-semibold mb-1">{value}</div>
        <div className="flex items-center text-xs">
          <TrendingUp 
            className={cn(
              "mr-1 h-3 w-3", 
              trendUp ? "text-income" : "text-expense"
            )} 
          />
          <span className={cn(
            "text-muted-foreground"
          )}>
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
