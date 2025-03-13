
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useExpenseContext } from '@/context/ExpenseContext';
import { 
  ExpenseCategory, 
  IncomeCategory, 
  TransactionType,
  getExpenseCategories,
  getIncomeCategories,
  getCategoryDisplayName
} from '@/utils/expenseUtils';
import { colors, globalStyles } from '@/utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import CategoryIcon from './CategoryIcon';

const AddTransactionButton = () => {
  const { addTransaction } = useExpenseContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<ExpenseCategory | IncomeCategory>('food');
  const [note, setNote] = useState<string>('');

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setCategory(type === 'expense' ? 'food' : 'salary');
    setNote('');
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    addTransaction(
      parseFloat(amount),
      category,
      type,
      note
    );

    resetForm();
    setIsModalVisible(false);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    // Reset category when switching types
    setCategory(newType === 'expense' ? 'food' : 'salary');
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>
      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <TouchableOpacity 
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="x" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, type === 'expense' && styles.activeTab]}
                onPress={() => handleTypeChange('expense')}
              >
                <Text style={[styles.tabText, type === 'expense' && styles.activeTabText]}>
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, type === 'income' && styles.activeTab]}
                onPress={() => handleTypeChange('income')}
              >
                <Text style={[styles.tabText, type === 'income' && styles.activeTabText]}>
                  Income
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
              >
                {(type === 'expense' ? getExpenseCategories() : getIncomeCategories()).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      category === cat && styles.selectedCategory
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <CategoryIcon 
                      category={cat}
                      color={category === cat ? colors.primary : colors.text}
                      size={24}
                    />
                    <Text style={[
                      styles.categoryText,
                      category === cat && styles.selectedCategoryText
                    ]}>
                      {getCategoryDisplayName(cat)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor={colors.textLight}
                />
              </View>
              
              <Text style={styles.label}>Note (Optional)</Text>
              <TextInput
                style={styles.noteInput}
                value={note}
                onChangeText={setNote}
                placeholder="Add a note"
                placeholderTextColor={colors.textLight}
                multiline
              />
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Add Transaction</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 76,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: `${colors.primary}10`,
  },
  tabText: {
    fontSize: 16,
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginRight: 8,
    padding: 8,
  },
  selectedCategory: {
    backgroundColor: `${colors.primary}10`,
    borderWidth: 2,
    borderColor: `${colors.primary}30`,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.primary,
    fontWeight: '500',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  currencySymbol: {
    fontSize: 18,
    color: colors.textLight,
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: colors.text,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    height: 80,
    backgroundColor: '#ffffff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  submitButton: {
    flex: 2,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default AddTransactionButton;
