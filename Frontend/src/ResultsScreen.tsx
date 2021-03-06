import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Header from './Header';
import Content from './Content';

const ResultsScreen = (props) => (
  <View style={{flex: 1, backgroundColor: '#3d6f67'}}>
    <SafeAreaView style={{flexDirection: 'column', flex: 1, justifyContent: 'flex-start'}}>
      <Header navigation={props.navigation} />
      <Content />
    </SafeAreaView>
  </View>
);

/*ResultsScreen.navigationOptions = {
  title: 'EcoMode',
  headerShown: true,
};*/

export default ResultsScreen;