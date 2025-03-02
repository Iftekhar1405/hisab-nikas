
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useExpenseContext } from '@/context/ExpenseContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  formatCurrency, 
  groupTransactionsByCategory,
  getDailyTransactions,
  getWeeklyTransactions,
  getMonthlyTransactions,
  getCategoryDisplayName,
  getTotalByType
} from '@/utils/expenseUtils';
import CategoryIcon from '@/components/CategoryIcon';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const { transactions } = useExpenseContext();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpense = getTotalByType(transactions, 'expense');
  
  // Group by category
  const expensesByCategory = groupTransactionsByCategory(expenseTransactions);
  const categoryData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: getCategoryDisplayName(category as any),
    value: amount,
    category
  }));
  
  // Sort categories by amount
  const sortedCategories = [...categoryData].sort((a, b) => b.value - a.value);
  const topCategories = sortedCategories.slice(0, 3);
  
  // Get time-based data
  const getTimeData = () => {
    switch (timeframe) {
      case 'daily':
        return Object.entries(getDailyTransactions(expenseTransactions)).map(([name, value]) => ({ name, value }));
      case 'weekly':
        return Object.entries(getWeeklyTransactions(expenseTransactions)).map(([name, value]) => ({ 
          name: `Week ${name}`, 
          value 
        }));
      case 'monthly':
        return Object.entries(getMonthlyTransactions(expenseTransactions)).map(([name, value]) => ({ name, value }));
      default:
        return [];
    }
  };
  
  const timeData = getTimeData();
  
  // Colors for the pie chart
  const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD166', '#F78FB3', '#6A0572', '#1FDA9A', '#4A90E2', '#7F8C8D'];
  
  return (
    <div className="min-h-screen pb-24 px-4 max-w-xl mx-auto">
      <header className="pt-8 pb-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">Analyze your spending habits</p>
      </header>
      
      <div className="space-y-6">
        <Card className="animate-slide-in-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Expense Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 rounded-lg p-4 flex items-start space-x-3 mb-6">
              <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">AI Insights</h4>
                <p className="text-sm text-muted-foreground">
                  {totalExpense > 0 ? (
                    <>
                      Based on your spending patterns, your highest expense category is{' '}
                      <span className="font-medium">{topCategories[0]?.name}</span>. 
                      Consider setting a budget for this category to manage expenses better.
                    </>
                  ) : (
                    <>
                      Start tracking your expenses to get AI-powered insights on your spending patterns.
                    </>
                  )}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Top Spending Categories</h3>
              {topCategories.length > 0 ? (
                <div className="space-y-3">
                  {topCategories.map((category, index) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${COLORS[index]}20`, color: COLORS[index] }}
                        >
                          <CategoryIcon category={category.category as any} size={16} />
                        </div>
                        <span>{category.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">{formatCurrency(category.value)}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {Math.round((category.value / totalExpense) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No expense data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-right">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex justify-between items-center">
              <span>Expense Analysis</span>
              <Tabs defaultValue="weekly" value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="ml-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                  <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Spent']}
                    labelStyle={{ color: 'var(--foreground)' }}
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
        
        <Card className="animate-slide-in-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Spent']}
                      contentStyle={{
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--background)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No data available
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center mt-2">
              {categoryData.map((category, index) => (
                <div key={category.category} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Navbar />
    </div>
  );
};

export default ReportsPage;
