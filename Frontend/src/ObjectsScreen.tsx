import React, { useEffect } from 'react';
import { TouchableOpacity, ImageBackground, processColor } from 'react-native';
import { useGlobal } from 'reactn';

const ObjectsScreen = (props) => {
  const [imgURI, setImgURI] = useGlobal('imgURI');

  return (
    <ImageBackground source={{uri: imgURI}} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}>
      <TouchableOpacity style={{
        position: 'absolute',
        top: 100,
        left: 50,
        height: 250,
        width: 200,
        borderColor: 'blue',
        borderWidth: 5,
        borderStyle: 'solid',
      }} onPress={() => props.navigation.navigate('Results')} />
    </ImageBackground>
  );
}

export default ObjectsScreen;