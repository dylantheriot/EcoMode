import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useGlobal } from 'reactn';

const Header = (props) => {
  const [tag, setTag] = useGlobal('tag')
  return (
  <View style={{
    backgroundColor: '#3d6f67',
    height: 64 + (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flexDirection: 'row',
  }}>
    <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => {
      setTag(null);
      props.navigation.navigate('Home');
      }}>
      <Image source={require('../assets/baseline_arrow_back_white_18dp.png')}/>
    </TouchableHighlight>
    <Text style={{
      color: 'white',
      alignSelf: 'center',
      fontSize: 30,
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Avenir',
      fontWeight: 'bold',
    }}>{tag ? tag.charAt(0).toUpperCase() + tag.substring(1) : 'Bottle'}</Text>
  </View>
)};

export default Header;