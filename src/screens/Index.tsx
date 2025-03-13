
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useExpenseContext } from '@/context/ExpenseContext';
import BottomTabBar from '@/components/BottomTabBar';
import { colors, globalStyles } from '@/utils/styles';
import TransactionsList from '@/components/TransactionsList';
import AddTransactionButton from '@/components/AddTransactionButton';
import DashboardStats from '@/components/DashboardStats';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Expense Tracker</Text>
          <Text style={styles.subtitle}>Manage your expenses effortlessly</Text>
        </View>
        
        <DashboardStats />
        <TransactionsList />
      </ScrollView>
      
      <AddTransactionButton />
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
  }
});

export default Index;
