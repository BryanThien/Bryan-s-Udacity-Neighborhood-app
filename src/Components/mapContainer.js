import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const map_key = 'AIzaSyCKnu3YbAv8wC4wOoZZvx8n4zSrvpxggjk';

class MapContainer extends Component {
    state = {
        map: null,
        markers: [],
        markerProps: [],
        activeMarker: null,
        activeMarkerProps: null,
        showingInfoWindow: false
    };

    mapReady = (props, map) => {
        this.setState({map});
        this.updateMarkers(this.props.locations);
    }

    closeInfoWindow = () => {
        if (this.state.activeMarker && this.state.activeMarker) {
        this.setState({showingInfoWindow: false, activeMarkerProps: null, activeMarker: null});
    }}

    onMarkerClick = (props, marker, event) => {
        this.closeInfoWindow();
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
                address: location.address
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
                    <h3>{amProps && amProps.name}</h3>
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
