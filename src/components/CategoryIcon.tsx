
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ExpenseCategory, IncomeCategory } from '@/utils/expenseUtils';

interface CategoryIconProps {
  category: ExpenseCategory | IncomeCategory;
  size?: number;
  color?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 20, 
  color = "#000000"
}) => {
  const icons: Record<ExpenseCategory | IncomeCategory, string> = {
    food: 'coffee',
    transport: 'truck',
    bills: 'file-text',
    shopping: 'shopping-bag',
    entertainment: 'music',
    health: 'activity',
    education: 'book-open',
    other: 'help-circle',
    salary: 'dollar-sign',
    business: 'briefcase',
    investment: 'trending-up',
    gift: 'gift',
  };

  return (
    <Icon 
      name={icons[category] || 'help-circle'} 
      size={size} 
      color={color}
    />
  );
};

export default CategoryIcon;
