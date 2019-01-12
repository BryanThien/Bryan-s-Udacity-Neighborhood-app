import React, { Component } from 'react';
import '../App.css';
import MapContainer from './mapContainer.js'

class App extends Component {
  render() {
    return (
    <div className="App">
    <div>
      <h1>Chanhassen MN Stores</h1>
    </div>
      <MapContainer/>
    </div>
      
    );
  }
}

export default App;
