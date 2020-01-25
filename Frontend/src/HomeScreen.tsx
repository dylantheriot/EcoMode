import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import { useGlobal } from 'reactn';
import { Camera } from 'expo-camera'; 

const HomeScreen = (props) => {
  const [hasCamPerm, setHasCamPerm] = useState(false);
  const [camType, setCamType] = useState(Camera.Constants.Type.back);
  const camera = useRef<Camera>(null);
  const [imgURI, setImgURI] = useGlobal('imgURI');

  useEffect(() => {
    (async() => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCamPerm(status === 'granted');
    })();
  }, []);

  const {height, width} = Dimensions.get('window');
  const newWidth = 3/4*height;
  const widthOffset = -(newWidth - width)/2;

  if (!hasCamPerm)
    return (<View><Text>EcoMode needs the camera to work :(</Text></View>);

  return (
  <View style={{flex: 1}}>
    <Camera type={camType} ref={camera} style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: widthOffset,
      right: widthOffset,
    }}>
      <TouchableOpacity style={{
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: 'lightgrey',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 16,
        left: newWidth / 2 - 32,
        zIndex: 2,
      }}
      onPress={() => {
        console.log('Button has been pressed');
        camera.current.takePictureAsync().then(img => {
          setImgURI(img.uri);
          props.navigation.navigate('Objects');
        });
      }}>
        <Image source={require('../assets/icon64.png')}/>
      </TouchableOpacity>
    </Camera>
  </View>
)};

export default HomeScreen;