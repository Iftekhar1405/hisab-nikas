
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('ExpenseTracker', () => App);
AppRegistry.runApplication('ExpenseTracker', {
  rootTag: document.getElementById('root')
});
