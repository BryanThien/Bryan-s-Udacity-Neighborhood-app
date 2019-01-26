import React, { Component } from 'react';
import {Map, InfoWindow,GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import ErrorHandle from './ErrorHandle.js';

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

    // updates the state values with new props values whenever any change happens to props values
    // Handles what should be state updated, closed and fetched when prop values change
    componentWillReceiveProps = (props) => {
        this.setState({firstDrop: false});

        if (this.state.markers.length !== props.locations.length) {
            this.closeInfoWindow();
            this.updateMarkers(props.locations);
            this.setState({activeMarker: null});
            return;
        }

        if (!props.selectedIndex || (this.state.activeMarker && 
            (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
                this.closeInfoWindow();
                
            }

        if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
            return;
        };
        this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
    }

// sets up map object and starts updateMarkers function to fill state with place data   
    mapReady = (props, map) => {
        this.setState({map});
        this.updateMarkers(this.props.locations);
    }

    closeInfoWindow = () => {
        this.state.activeMarker && this.state.activeMarker.setAnimation(null); 
        this.setState({showingInfoWindow: false, activeMarkerProps: null, activeMarker: null});
    }

    getBusinessInfo = (props, data) => {
        return data
            .data
            .response
            .venues
            .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
    }

// Closes any open info window, Fetches image from foursquare changes states to communicate a marker is open.
    onMarkerClick = (props, marker, event) => {
        
        this.closeInfoWindow();
        
        let activeMarkerProps;

        axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${fsClientId}&client_secret=${fsClientSecret}&v=${fsVersion}&radius=100&ll=${props.position.lat},${props.position.lng}`).then(result => {
                let restaurant = this.getBusinessInfo(props, result);
                activeMarkerProps = {
                    ...props,
                    foursquare: restaurant[0]
                };
                if (activeMarkerProps.foursquare) {
                    let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${fsClientId}&client_secret=${fsClientSecret}&v=${fsVersion}`;
                    axios.get(url)
                        .then(result => {
                            activeMarkerProps = {
                                ...activeMarkerProps,
                                images: result.data.response.photos
                            };
                            if (this.state.activeMarker)
                                this.state.activeMarker.setAnimation(null);
                                marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                                this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps})
                        })
                } else {
                    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                    this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps})
                }
            })


        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }
    // Processes and creates location markers for the map
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
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.location,
                map: this.state.map,
                animation
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
            role="application"
            aria-label="map"
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
                    <div>
                        <img
                            alt={amProps && amProps.images ? amProps.name + " food picture" : ""}
                            src={amProps && amProps.images ? amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix : ""}
                        />
                        <h3>{amProps && amProps.images ? "Image from Foursquare" : null}</h3>
                    </div>
                </div>
            </InfoWindow>
            </Map>
        </div>
        );
  }
}

export default GoogleApiWrapper({
    apiKey: map_key, LoadingContainer: ErrorHandle
})(MapContainer)

