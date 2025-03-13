
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { useExpenseContext } from '@/context/ExpenseContext';
import BottomTabBar from '@/components/BottomTabBar';
import { colors, globalStyles } from '@/utils/styles';
import Icon from 'react-native-vector-icons/Feather';

const SettingsScreen = () => {
  const { budget, setBudget } = useExpenseContext();
  const [localBudget, setLocalBudget] = useState(budget.toString());
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const [enableVoiceInput, setEnableVoiceInput] = useState(false);
  
  const handleSaveBudget = () => {
    const newBudget = parseFloat(localBudget);
    if (!isNaN(newBudget) && newBudget >= 0) {
      setBudget(newBudget);
    }
  };
  
  const handleExportData = () => {
    // In a real app, this would generate and download data
    setTimeout(() => {
      Alert.alert(
        'Data exported',
        'Your expense data has been exported successfully'
      );
    }, 1000);
  };
  
  const handleClearData = () => {
    Alert.alert(
      'Clear all data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // In a real app, this would clear all data
            Alert.alert(
              'Data cleared',
              'All your expense data has been removed'
            );
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="dollar-sign" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Budget Settings</Text>
          </View>
          
          <Text style={styles.label}>Monthly Budget</Text>
          <View style={styles.budgetInputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.input}
                value={localBudget}
                onChangeText={setLocalBudget}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveBudget}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Set your monthly budget to track spending limits
          </Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="globe" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Appearance & Language</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch between light and dark themes
              </Text>
            </View>
            <Switch
              value={enableDarkMode}
              onValueChange={setEnableDarkMode}
              trackColor={{ false: '#ddd', true: `${colors.primary}90` }}
              thumbColor={enableDarkMode ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>Language</Text>
          <View style={styles.languageSelector}>
            <TouchableOpacity style={styles.languageOption}>
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="cpu" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Advanced Features</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Voice Input</Text>
              <Text style={styles.settingDescription}>
                Add expenses using voice commands
              </Text>
            </View>
            <Switch
              value={enableVoiceInput}
              onValueChange={setEnableVoiceInput}
              trackColor={{ false: '#ddd', true: `${colors.primary}90` }}
              thumbColor={enableVoiceInput ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>Data Management</Text>
          <TouchableOpacity 
            style={styles.dataButton}
            onPress={handleExportData}
          >
            <Icon name="download" size={16} color={colors.text} style={styles.buttonIcon} />
            <Text style={styles.dataButtonText}>Export Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.dataButton, styles.dangerButton]}
            onPress={handleClearData}
          >
            <Icon name="trash-2" size={16} color={colors.danger} style={styles.buttonIcon} />
            <Text style={[styles.dataButtonText, styles.dangerText]}>Clear All Data</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Expense Tracker v1.0.0</Text>
          <Text style={styles.footerSubtext}>All data is stored locally on your device</Text>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: colors.text,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.text,
  },
  budgetInputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  currencySymbol: {
    color: colors.textLight,
    fontSize: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  languageSelector: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  languageText: {
    fontSize: 16,
    color: colors.text,
  },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  dangerButton: {
    borderColor: `${colors.danger}30`,
  },
  buttonIcon: {
    marginRight: 8,
  },
  dataButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  dangerText: {
    color: colors.danger,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    color: colors.textLight,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  }
});

export default SettingsScreen;
