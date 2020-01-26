import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, Platform } from 'react-native';
import Constants from 'expo-constants';

const Header = (props) => (
  <View style={{
    backgroundColor: '#3d6f67',
    height: 64 + (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flexDirection: 'row',
  }}>
    <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => props.navigation.navigate('Home')}>
      <Image source={require('../assets/baseline_arrow_back_white_18dp.png')}/>
    </TouchableHighlight>
    <Text style={{
      color: 'white',
      alignSelf: 'center',
      fontSize: 20,
      flex: 1,
      textAlign: 'center',
    }}>Metallic Can</Text>
  </View>
);

export default Header;