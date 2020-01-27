import React, { useEffect } from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { useGlobal } from 'reactn';

const ObjectsScreen = (props) => {
  const [imgURI, setImgURI] = useGlobal('imgURI');
  const boxes = [{left: 100, top: 150, width: 200, height: 150, text: 'Can'}];

  const renderBox = ({left, top, width, height, text}) => (
    <TouchableOpacity style={{
      position: 'absolute',
      top,
      left,
      height,
      width,
      borderColor: 'blue',
      borderWidth: 5,
      borderStyle: 'solid',
    }} onPress={() => props.navigation.navigate('Results')} key={text} />
  );
  return (
    <ImageBackground source={{uri: imgURI}} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}>
      {
        boxes.map(box => renderBox(box))
      }
    </ImageBackground>
  );
}

export default ObjectsScreen;