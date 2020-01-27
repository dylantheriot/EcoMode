import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import { useGlobal } from 'reactn';
import { Camera } from 'expo-camera'; 
import * as Font from 'expo-font';

const HomeScreen = (props) => {
  const [hasCamPerm, setHasCamPerm] = useState(false);
  const [camType, setCamType] = useState(Camera.Constants.Type.back);
  const camera = useRef<Camera>(null);
  const [imgURI, setImgURI] = useGlobal('imgURI');
  const [tag, setTag] = useGlobal('tag');

  useEffect(() => {
    (async() => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCamPerm(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    Font.loadAsync({
      'Avenir': require('../assets/Avenir.otf')
    })
  }, []);

  useEffect(() => {
    if (camera.current) camera.current.resumePreview();
  }, [tag]);

  const {height, width} = Dimensions.get('window');
  const newWidth = 3/4*height;
  const widthOffset = -(newWidth - width)/2;

  if (!hasCamPerm)
    return (<View><Text>EcoMode needs the camera to work :(</Text></View>);

  const API_ENDPOINT = 'http://eco-mode.appspot.com/'

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
        camera.current.takePictureAsync({base64: true}).then(img => {
          console.log('Picture taken');
          fetch(API_ENDPOINT + 'identify', {
            method: 'POST',
            body: img.base64,
          }).then(res => res.json()).then(res => {
            console.log(res);
            /*if (res.description.tags[0] === 'indoor' || res.description.tags[0] === 'sitting')
              setTag(res.description.tags[1]);
            else
              setTag(res.description.tags[0]);*/
            const bad = ['indoor', 'sitting', 'table'];
            let i = 0;
            while(bad.find(x => x === res.description.tags[i]))
              i++;
            console.log(res.description.tags[i]);
            setTag(res.description.tags[i]);
            setImgURI(img.uri);
            console.log(props);
            props.navigation.navigate('Objects');
          }).catch(err => {
            console.log(err);
            setTag('bottle');
            setImgURI(img.uri);
            props.navigation.navigate('Objects');
          });
        });
        camera.current.pausePreview();
      }}>
        <Image source={require('../assets/icon2.png')}/>
      </TouchableOpacity>
    </Camera>
  </View>
)};

export default HomeScreen;