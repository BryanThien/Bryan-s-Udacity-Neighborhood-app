import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const map_key = 'AIzaSyCKnu3YbAv8wC4wOoZZvx8n4zSrvpxggjk';

class MapContainer extends Component {
  render() {
      const style = {
          width: '100vw',
          height: '100vh'
      }
    return (
    <div style={style}>
        <Map google={this.props.google} />
    </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: map_key
})(MapContainer)
