import React from 'react';
import { Image } from 'react-native';
import { useGlobal } from 'reactn';
import { State } from 'reactn/default';

const ObjectsScreen = () => {
  const [imgURI, setImgURI] = useGlobal('imgURI');
  return (
    <Image source={{uri: imgURI}} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}>
      
    </Image>
  );
}

export default ObjectsScreen;