import React from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import Content from './Content';

const ResultsScreen = () => (
  <View style={{flexDirection: 'column', flex: 1, justifyContent: 'flex-start'}}>
    <Header />
    <Content />
  </View>
);

export default ResultsScreen;