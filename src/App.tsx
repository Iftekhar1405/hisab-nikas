
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpenseProvider } from '@/context/ExpenseContext';
import Index from './screens/Index';
import ReportsScreen from './screens/ReportsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <ExpenseProvider>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </ExpenseProvider>
  </NavigationContainer>
);

export default App;
