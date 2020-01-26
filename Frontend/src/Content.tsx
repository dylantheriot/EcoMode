import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { useGlobal } from 'reactn';
import Carousel from 'react-native-snap-carousel';
import GivingDirections from './GivingDirections';

interface Card {
  link: string;
  thumbnail: string;
  title: string;
}

const API_ENDPOINT = 'http://eco-mode.appspot.com/'
const renderCard = ({item, index}): JSX.Element => item.thumbnail ? 
  (<TouchableOpacity onPress={() => Linking.openURL(item.link)}>
    <Image source={{uri: item.thumbnail, height: 168, width: 300}} />
  </TouchableOpacity>)
  : 
  (null);

const Content = () => {
  const [ytCards, setYTCards] = useState<Card[]>([]);
  const [ptCards, setPTCards] = useState<Card[]>([]);
  const [tag, setTag] = useGlobal('tag');
  const [ytFocusedTitle, setYTTitle] = useState('Loading...');
  const [ptFocusedTitle, setPTTitle] = useState('Loading...');
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
  }, []);

  return (
  <View style={{
    backgroundColor: '#15453d',
    flexGrow: 1,
  }}>
    <Text style={styles.heading}>Reuse It!</Text>
    <Carousel
      data={ytCards}
      renderItem={renderCard}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={300}
      style={{alignSelf: 'stretch', flexGrow: 0, height: 200}}
      activeSlideAlignment="center"
      loop
      onSnapToItem={(idx) => {
        setYTTitle(ytCards[idx].title);
      }}
      firstItem={1} />
    <Text style={styles.videoTitle}>{ytFocusedTitle}</Text>
    <Carousel
      data={ptCards}
      renderItem={renderCard}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={300}
      style={{alignSelf: 'stretch', flexGrow: 0, height: 200}}
      activeSlideAlignment="center"
      loop
      onSnapToItem={(idx) => {
        setPTTitle(ptCards[idx].title);
      }}
      firstItem={1} />
    <Text style={styles.videoTitle}>{ptFocusedTitle}</Text>
    <Text style={styles.heading}>Recycle It!</Text>
    <GivingDirections />
  </View>
)};

var styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: 'white',
    fontSize: 20,
  }
});

export default Content;