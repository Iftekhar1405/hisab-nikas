
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useExpenseContext } from '@/context/ExpenseContext';
import BottomTabBar from '@/components/BottomTabBar';
import { colors, globalStyles } from '@/utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import { formatCurrency } from '@/utils/expenseUtils';

const ReportsScreen = () => {
  const { transactions } = useExpenseContext();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  // Calculate total expenses
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.subtitle}>Analyze your spending habits</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.insightHeader}>
            <Text style={styles.cardTitle}>Expense Insights</Text>
          </View>
          
          <View style={styles.aiInsightContainer}>
            <View style={styles.aiIconContainer}>
              <Icon name="cpu" size={18} color={colors.primary} />
            </View>
            <View style={styles.aiContent}>
              <Text style={styles.aiTitle}>AI Insights</Text>
              <Text style={styles.aiText}>
                {totalExpenses > 0 ? (
                  "Based on your spending patterns, your highest expense category is Food. Consider setting a budget for this category to manage expenses better."
                ) : (
                  "Start tracking your expenses to get AI-powered insights on your spending patterns."
                )}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.timeframeHeader}>
            <Text style={styles.cardTitle}>Expense Analysis</Text>
            <View style={styles.tabs}>
              <TouchableOpacity 
                style={[styles.tab, timeframe === 'daily' && styles.activeTab]}
                onPress={() => setTimeframe('daily')}
              >
                <Text style={[styles.tabText, timeframe === 'daily' && styles.activeTabText]}>
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, timeframe === 'weekly' && styles.activeTab]}
                onPress={() => setTimeframe('weekly')}
              >
                <Text style={[styles.tabText, timeframe === 'weekly' && styles.activeTabText]}>
                  Weekly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, timeframe === 'monthly' && styles.activeTab]}
                onPress={() => setTimeframe('monthly')}
              >
                <Text style={[styles.tabText, timeframe === 'monthly' && styles.activeTabText]}>
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              {transactions.length > 0 
                ? "Chart will be displayed here" 
                : "No data available for chart"
              }
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <BottomTabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Space for bottom tab bar
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  card: {
    ...globalStyles.card,
    marginBottom: 20,
  },
  insightHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  aiInsightContainer: {
    flexDirection: 'row',
    backgroundColor: `${colors.primary}10`,
    borderRadius: 12,
    padding: 16,
  },
  aiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.text,
  },
  aiText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  timeframeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    color: colors.textLight,
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textLight,
    fontSize: 14,
  }
});

export default ReportsScreen;
