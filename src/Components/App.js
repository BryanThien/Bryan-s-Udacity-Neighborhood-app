import React, { Component } from 'react';
import '../App.css';
import MapContainer from './mapContainer.js'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
class App extends Component {
  state = {
    lat: 44.85994 ,
    lon: -93.53345,
    zoom: 16,
}
  render() {
    return (
    <div className="App">
    <div>
      <h1>Chanhassen MN Stores</h1>
    </div>
      <MapContainer
      lat={this.state.lat}
      lon={this.state.lon}
      zoom={this.state.zoom}
      />
    </div>
      
    );
  }
}

export default App;
