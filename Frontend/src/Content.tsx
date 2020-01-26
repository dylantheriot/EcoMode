import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ytCards = [{title: 'F'}, {title: 'G'}];
const renderCard = (info) => {
  <Text>{info.title}</Text>
}

const Content = () => (
  <View style={{
    backgroundColor: '#15453d',
    flexGrow: 1,
  }}>
    <Text style={styles.heading}>Regldfjsduse It!</Text>
    <Text style={styles.heading}>Recycle It!</Text>
    <Text style={styles.heading}>Delete this!</Text>
  </View>
);

var styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 20,
  }
})

export default Content;