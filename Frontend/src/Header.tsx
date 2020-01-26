import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';

const Header = () => (
  <View style={{
    backgroundColor: '#3d6f67',
    height: 64 + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
  }}>
    <TouchableHighlight style={{alignSelf: 'center'}}>
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