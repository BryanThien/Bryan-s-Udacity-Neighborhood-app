import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

const map_key = 'AIzaSyCKnu3YbAv8wC4wOoZZvx8n4zSrvpxggjk';
const fsClientId = 'K4XTXBKQ5I2AUZPYHSK1BUWR5KNVR0RCHE1AIVEZT1LPFX2S';
const fsClientSecret = 'J5LE3UTJ0PQ1MIYW2YKV0DD2MULXKIF413Q1WZDLZ4W035PZ';
const fsVersion = '20181216'

class MapContainer extends Component {
    state = {
        map: null,
        markers: [],
        markerProps: [],
        activeMarker: null,
        activeMarkerProps: null,
        showingInfoWindow: false
    };

    componentDidMount() {
    }


// sets up map object and starts updateMarkers function to fill state with place data   
    mapReady = (props, map) => {
        this.setState({map});
        this.updateMarkers(this.props.locations);
    }

    closeInfoWindow = () => {
        if (this.state.activeMarker && this.state.activeMarker) {
        this.setState({showingInfoWindow: false, activeMarkerProps: null, activeMarker: null});
    }}

    getBusinessInfo = (props, data) => {
        return data
            .response
            .venues
            .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
    }


    onMarkerClick = (props, marker, event) => {
        // Closes any info windows open
        this.closeInfoWindow();
        console.log(props.position.lat);
        console.log(props.position.lng);
        let url = `https://api.foursquare.com/v2/venues/search?client_id=${fsClientId}&client_secret=${fsClientSecret}&v=${fsVersion}&radius=100&ll=${props.position.lat},${props.position.lng}`
        let headers = new Headers();
        let request = new Request(url, {
            method: 'GET',
            headers
        });
        
        let activeMarkerProps;
        fetch(request)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let restaurant = this.getBusinessInfo(props, result);
                activeMarkerProps = {
                    ...props,
                    foursquare: restaurant[0]
                };

                if (activeMarkerProps.foursquare) {
                    console.log(restaurant[0].id);
                }
            })


        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }
    
    updateMarkers = (allLocations) => {
        if (!allLocations)
        return;

        this.state.markers.forEach(marker => marker.setMap(null));
        let markerProps = [];
        let markers = allLocations.map((location, index) => {
            let mProps = {
                key: index,
                name: location.name,
                position: location.location,
                url: location.url,
                address: location.fullAddress
            };
            markerProps.push(mProps);

            let marker = new this.props.google.maps.Marker({
                position: location.location,
                map: this.state.map
            });
            marker.addListener('click', () => {
                this.onMarkerClick(mProps, marker, null);
            });
            return marker;
        })
        this.setState({markers, markerProps});
    }
    
    render() {
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }
        const style = {
          width: '100vw',
          height: '100vh'
        }
        const amProps = this.state.activeMarkerProps;
        
        return (
        <div style={style}>
            <Map 
            google={this.props.google} 
            onReady={this.mapReady}
            onClick={this.closeInfoWindow}
            initialCenter={center}
            zoom={this.props.zoom}
            style={style}>
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onclose={this.state.closeInfoWindow}>
                <div>
                    <h2>{amProps && amProps.name}</h2>
                    <h4>{amProps && amProps.address}</h4>
                    <h3><a href={amProps && amProps.url}>See Website</a></h3>
                </div>
            </InfoWindow>
            </Map>
        </div>
        );
  }
}

export default GoogleApiWrapper({
    apiKey: map_key
})(MapContainer)

