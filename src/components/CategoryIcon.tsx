
import React from 'react';
import { 
  ShoppingBag, 
  UtensilsCrossed, 
  Car, 
  Receipt, 
  Music, 
  Stethoscope, 
  GraduationCap, 
  CircleDollarSign, 
  Briefcase, 
  TrendingUp, 
  Gift, 
  HelpCircle 
} from 'lucide-react';
import { ExpenseCategory, IncomeCategory } from '@/utils/expenseUtils';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
  category: ExpenseCategory | IncomeCategory;
  size?: number;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 24, 
  className 
}) => {
  const icons: Record<ExpenseCategory | IncomeCategory, React.ReactNode> = {
    food: <UtensilsCrossed size={size} />,
    transport: <Car size={size} />,
    bills: <Receipt size={size} />,
    shopping: <ShoppingBag size={size} />,
    entertainment: <Music size={size} />,
    health: <Stethoscope size={size} />,
    education: <GraduationCap size={size} />,
    other: <HelpCircle size={size} />,
    salary: <CircleDollarSign size={size} />,
    business: <Briefcase size={size} />,
    investment: <TrendingUp size={size} />,
    gift: <Gift size={size} />,
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {icons[category] || <HelpCircle size={size} />}
    </div>
  );
};

export default CategoryIcon;
