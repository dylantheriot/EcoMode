import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


const start = {latitude: 30.618359, longitude: -96.337089};
const destination = {latitude: 37.771707, longitude: -122.4053769};

const GOOGLE_MAPS_APIKEY = 'AIzaSyAL9AbiDlJD4KEuZzUm34Lj8Qn08sRJPvA'


class GivingDirections extends Component {
    render() {
        return (
            <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            } }
            >
                <MapViewDirections
                    origin={start}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
                <Marker coordinate={start}
                    // title=insertTitleHere
                />

                <Marker coordinate={destination}
                    // title=insertTitleHere 
                />
            </MapView>
        )
    }
}

export default GivingDirections;
