import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const map_key = 'AIzaSyCKnu3YbAv8wC4wOoZZvx8n4zSrvpxggjk';

class MapContainer extends Component {
    render() {
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }
        const style = {
          width: '100vw',
          height: '100vh'
      }
    return (
    <div style={style}>
        <Map 
        google={this.props.google} 
        initialCenter={center}
        zoom={this.props.zoom}>
            <Marker
          title={"Axel's"}
          name={"Axel's Restaurant"}
          position={{lat: 44.8624716, lng: -93.5347458}}
            />
            <Marker
          title={"Kai's"}
          name={"Kai's Sushi and Grill"}
          position={{lat: 44.8627453,lng: -93.5355888}}
            />
            <Marker
          title={"Wild Wings"}
          name={"Buffalo Wild Wings"}
          position={{lat: 44.8594136,lng: -93.5343053}}
            />
            <Marker
          title={"Smashburger"}
          name={"Smashburger"}
          position={{lat: 44.8598655,lng: -93.53028499999999}}
            />
            <Marker
          title={"Davanni's"}
          name={"Davanni's Pizza & Hot Hoagies"}
          position={{lat: 44.8567535,lng: -93.53273809999999}}
            />
        </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: map_key
})(MapContainer)
