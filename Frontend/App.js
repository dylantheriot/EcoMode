import React from 'react';
import HomeScreen from './src/HomeScreen';
import ObjectsScreen from './src/ObjectsScreen';
import ResultsScreen from './src/ResultsScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      Objects: ObjectsScreen,
      Results: ResultsScreen,
    },
    {
      initialRouteName: 'Results',
      defaultNavigationOptions: {
        headerShown: false,
      }
    })
);

const App = () => <AppContainer />;

export default App; 