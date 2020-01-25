import React from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { useGlobal } from 'reactn';
import { State } from 'reactn/default';

const ObjectsScreen = () => {
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
      }} />
    </ImageBackground>
  );
}

export default ObjectsScreen;