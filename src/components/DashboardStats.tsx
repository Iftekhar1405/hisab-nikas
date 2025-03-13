import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useExpenseContext } from '@/context/ExpenseContext';
import { 
  formatCurrency, 
  getTotalByType, 
  calculateRemainingBudget
} from '@/utils/expenseUtils';
import { colors, globalStyles } from '@/utils/styles';
import Icon from 'react-native-vector-icons/Feather';

const DashboardStats = () => {
  const { transactions, budget, isLoading } = useExpenseContext();
  
  const totalExpense = getTotalByType(transactions, 'expense');
  const totalIncome = getTotalByType(transactions, 'income');
  const balance = totalIncome - totalExpense;
  const budgetRemaining = calculateRemainingBudget(budget, totalExpense);
  const budgetPercentage = budget > 0 ? Math.min(100, (totalExpense / budget) * 100) : 0;
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingCircle} />
        <View style={styles.loadingLine} />
        <View style={styles.loadingSmallLine} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <StatCard 
          title="Total Expenses"
          value={formatCurrency(totalExpense)}
          icon="arrow-down"
          iconColor={colors.expense}
          trend="+5% from last month"
          style={styles.statCard}
        />
        <StatCard 
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon="arrow-up"
          iconColor={colors.income}
          trend="+12% from last month"
          style={styles.statCard}
        />
      </View>
      
      <StatCard 
        title="Current Balance"
        value={formatCurrency(balance)}
        icon="dollar-sign"
        iconColor="#000000"
        trend="Based on all transactions"
        style={[styles.balanceCard, { backgroundColor: balance >= 0 ? '#f2faf5' : '#fff5f5' }]}
      />
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Budget Status</Text>
        </View>
        
        <View style={styles.budgetSection}>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Monthly Budget</Text>
            <Text style={styles.budgetValue}>{formatCurrency(budget)}</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${budgetPercentage}%` }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.budgetRow}>
            <Text style={[
              styles.budgetStatus,
              { color: budgetRemaining > 0 ? colors.income : colors.expense }
            ]}>
              {budgetRemaining > 0 
                ? `${formatCurrency(budgetRemaining)} remaining` 
                : `Over budget by ${formatCurrency(Math.abs(budgetRemaining))}`}
            </Text>
            <Text style={styles.budgetPercentage}>{budgetPercentage.toFixed(0)}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  trend: string;
  style?: object;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  iconColor,
  trend,
  style
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={16} color={iconColor} />
        </View>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.trendContainer}>
        <Icon name="trending-up" size={12} color={colors.textLight} style={styles.trendIcon} />
        <Text style={styles.trendText}>{trend}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  loadingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f2f2f2',
    marginBottom: 16,
  },
  loadingLine: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
  },
  loadingSmallLine: {
    width: 80,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    ...globalStyles.card,
  },
  statCard: {
    flex: 1,
    marginRight: 8,
  },
  balanceCard: {
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...globalStyles.shadow,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.text,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: 4,
  },
  trendText: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  budgetSection: {
    marginBottom: 8,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  progressContainer: {
    marginVertical: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  budgetStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  budgetPercentage: {
    fontSize: 14,
    color: colors.textLight,
  }
});

export default DashboardStats;
