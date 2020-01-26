import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { useGlobal } from 'reactn';
import Carousel from 'react-native-snap-carousel';

interface Card {
  link: string;
  thumbnail: string;
  title: string;
}

const API_ENDPOINT = 'http://eco-mode.appspot.com/'
const renderCard = ({item, index}): JSX.Element => item.thumbnail ? 
  (<TouchableOpacity onPress={() => Linking.openURL(item.link)}>
    <Image source={{uri: item.thumbnail, height: 200, width: 300}} />
  </TouchableOpacity>)
  : 
  (null);

const Content = () => {
  const [ytCards, setYTCards] = useState<Card[]>([]);
  const [tag, setTag] = useGlobal('tag');
  const [focusedItemTitle, setTitle] = useState('Loading...');
  useEffect(() => {
    fetch(API_ENDPOINT+`youtube?q=${tag}`).then(res => res.json()).then(res => {
      setYTCards(res.results);
      setTitle(ytCards[1].title);
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
      style={{alignSelf: 'stretch', flexGrow: 0}}
      activeSlideAlignment="center"
      loop
      onSnapToItem={(idx) => {
        setTitle(ytCards[idx].title);
      }}
      firstItem={1} />
    <Text style={styles.videoTitle}>{focusedItemTitle}</Text>
    <Text style={styles.heading}>Recycle It!</Text>
    <Image source={{uri: 'https://i.ytimg.com/vi/hbLyPGfpSEY/0.jpg', width: 300, height: 200}} />
    <Text style={styles.heading}>Delete this!</Text>
  </View>
)};

var styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 20,
  },
  videoTitle: {
    color: 'white',
    fontSize: 40,
  }
});

export default Content;