import React from 'react';
import { View, Text, StatusBar } from 'react-native';

const Header = () => (
  <View style={{
    backgroundColor: '#3d6f67',
    height: 64 + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: "center",
  }}>
    <Text style={{
      color: 'white',
      alignSelf: 'center',
      fontSize: 20,
    }}>Metallic Can</Text>
  </View>
);

export default Header;