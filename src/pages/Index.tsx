
import React from 'react';
import Dashboard from '@/components/Dashboard';
import ExpenseList from '@/components/ExpenseList';
import ExpenseForm from '@/components/ExpenseForm';
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 px-4 max-w-xl mx-auto">
      <header className="pt-8 pb-6">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <p className="text-muted-foreground mt-1">Manage your expenses effortlessly</p>
      </header>
      
      <div className="space-y-8">
        <Dashboard />
        <ExpenseList />
      </div>
      
      <ExpenseForm />
      <Navbar />
    </div>
  );
};

export default Index;
