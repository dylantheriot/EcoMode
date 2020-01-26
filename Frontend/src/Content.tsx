import React, { useEffect, useState } from 'react';
import { Text, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useGlobal } from 'reactn';
import Carousel from 'react-native-snap-carousel';
import GivingDirections from './GivingDirections';

interface Card {
  link: string;
  thumbnail: string;
  title: string;
}

const API_ENDPOINT = 'http://eco-mode.appspot.com/'
const ytLogo = require('../assets/youtube.png');
const ptLogo = require('../assets/pinterest.png');
const renderCard = ({item, index}, pt?: boolean): JSX.Element => item.thumbnail ? 
  (<TouchableOpacity onPress={() => Linking.openURL(item.link)}>
    <ImageBackground source={{uri: item.thumbnail, height: 168, width: 300}}>
      <Image source={pt ? ptLogo : ytLogo} width={50} />
    </ImageBackground>
  </TouchableOpacity>)
  : 
  (null);
const companyImgs = [require('../assets/Apple.png'), require('../assets/Crayola.png'), 
  require('../assets/Nike.png'), require('../assets/Microsoft.png')];
const renderImage = ({item, index}) => (
  <Image source={companyImgs[index]} width={300} height={540} />
);

const Content = () => {
  const [ytCards, setYTCards] = useState<Card[]>([]);
  const [ptCards, setPTCards] = useState<Card[]>([]);
  const [tag, setTag] = useGlobal('tag');
  const [ytFocusedTitle, setYTTitle] = useState('Loading...');
  const [ptFocusedTitle, setPTTitle] = useState('Loading...');
  const [description, setDescription] = useState('Checking recyclability...');
  useEffect(() => {
    fetch(API_ENDPOINT+`youtube?q=${tag}`).then(res => res.json()).then(res => {
      setYTCards(res.results);
      setYTTitle(res.results[1].title);
    });
    fetch(API_ENDPOINT+`pinterest?q=${tag}`).then(res => res.json()).then(res => {
      console.log(res.results);
      setPTCards(res.results);
      setPTTitle(res.results[1].title);
    });
    fetch(API_ENDPOINT+`recycle?q=${tag}`).then(res => res.json()).then(res => {
      console.log(res.results[0].value);
      const recyclable = res.results[0].value === 'Recycle';
      setDescription(`${tag ? tag.charAt(0).toUpperCase() + tag.substring(1) : 'Bottle'} is${recyclable ? ' ': ' not '}recyclable!`);
    })
  }, []);

  return (
  <ScrollView style={{
    backgroundColor: '#15453d',
    flexGrow: 1,
  }}>
    <Text style={{
      color: 'white', 
      textAlign: 'center', 
      fontSize: 16,
      paddingTop: 8,}}>{description}</Text>
    <Text style={styles.heading}>Reuse It!</Text>
    <Carousel
      data={ytCards}
      renderItem={item =>renderCard(item, false)}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={300}
      style={{alignSelf: 'stretch', flexGrow: 0, height: 200}}
      activeSlideAlignment="center"
      loop
      onSnapToItem={(idx) => {
        setYTTitle(ytCards[idx].title);
      }}
      firstItem={1} />
    <Text style={styles.videoTitle} numberOfLines={1}>{ytFocusedTitle}</Text>
    <Carousel
      data={ptCards}
      renderItem={item => renderCard(item, true)}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={300}
      style={{alignSelf: 'stretch', flexGrow: 0, height: 200}}
      activeSlideAlignment="center"
      loop
      onSnapToItem={(idx) => {
        setPTTitle(ptCards[idx].title);
      }}
      firstItem={1} />
    <Text style={styles.videoTitle} numberOfLines={1}>{ptFocusedTitle}</Text>
    <Text style={styles.heading}>Recycle It!</Text>
    <GivingDirections />
    <Text style={styles.heading}>Relocate It!</Text>
    <Text style={{color: 'white', paddingBottom: 8}}>Check out these cool recycling campaigns!</Text>
    <Carousel
      data={new Array(4).fill(null)}
      renderItem={renderImage}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={300}
      style={{alignSelf: 'stretch', flexGrow: 0, height: 540}}
      activeSlideAlignment="center"/>
  </ScrollView>
)};

var styles = StyleSheet.create({
  heading: {
    color: '#43c59d',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 4,
    fontFamily: 'Avenir',
  },
  videoTitle: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 4,
  }
});

export default Content;