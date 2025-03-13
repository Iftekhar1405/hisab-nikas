
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useExpenseContext } from '@/context/ExpenseContext';
import { 
  Transaction, 
  formatCurrency, 
  formatDate, 
  getCategoryDisplayName,
  getRecentTransactions
} from '@/utils/expenseUtils';
import { colors, globalStyles } from '@/utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import CategoryIcon from './CategoryIcon';

interface TransactionsListProps {
  transactions?: Transaction[];
  limit?: number;
  showDelete?: boolean;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions: propTransactions, 
  limit = 5,
  showDelete = true
}) => {
  const { transactions: contextTransactions, deleteTransaction } = useExpenseContext();
  const transactions = propTransactions || contextTransactions;
  
  const recentTransactions = getRecentTransactions(transactions, limit);
  
  if (recentTransactions.length === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          <Text style={styles.cardSubtitle}>No transactions yet</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Add your first transaction to see it here
          </Text>
        </View>
      </View>
    );
  }
  
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.categoryIcon,
          { 
            backgroundColor: item.type === 'expense' 
              ? `${colors.expense}20` 
              : `${colors.income}20` 
          }
        ]}>
          <CategoryIcon 
            category={item.category} 
            color={item.type === 'expense' ? colors.expense : colors.income}
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionCategory}>
            {getCategoryDisplayName(item.category)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.date)}
            {item.note && ` • ${item.note}`}
          </Text>
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: item.type === 'expense' ? colors.expense : colors.income }
        ]}>
          {item.type === 'expense' ? '-' : '+'}
          {formatCurrency(item.amount)}
        </Text>
        
        {showDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTransaction(item.id)}
          >
            <Icon name="x" size={16} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>
        <Text style={styles.cardSubtitle}>Your latest transactions</Text>
      </View>
      
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  }
});

export default TransactionsList;
