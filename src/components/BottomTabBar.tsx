
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '@/utils/styles';

const BottomTabBar = () => {
  const navigation = useNavigation();
  
  const goTo = (screenName: string) => {
    // @ts-ignore - navigation.navigate expects specific screen names
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TabItem 
        icon="home" 
        label="Dashboard" 
        onPress={() => goTo('Home')} 
        active={true} 
      />
      <TabItem 
        icon="pie-chart" 
        label="Reports" 
        onPress={() => goTo('Reports')} 
        active={false} 
      />
      <TabItem 
        icon="settings" 
        label="Settings" 
        onPress={() => goTo('Settings')} 
        active={false} 
      />
    </View>
  );
};

interface TabItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  active: boolean;
}

const TabItem = ({ icon, label, onPress, active }: TabItemProps) => {
  return (
    <TouchableOpacity 
      style={[styles.tabItem, active && styles.activeTab]} 
      onPress={onPress}
    >
      <Icon 
        name={icon} 
        size={22} 
        color={active ? colors.primary : colors.textLight} 
      />
      <Text style={[styles.tabLabel, active && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: `${colors.primary}10`,
  },
  tabLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '500',
  },
});

export default BottomTabBar;
