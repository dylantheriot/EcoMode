import React from 'react';
import HomeScreen from './src/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerShown: false,
      }
    })
);

const App = () => <AppContainer />;

export default App; 