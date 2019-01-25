import React, { Component } from 'react';
import '../App.css';
import MapContainer from './mapContainer.js'
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListDrawer from './ListDrawer.js';

class App extends Component {
  locations = [
    {
      name: "Smashburger",
      location: {lat: 44.8598655, lng: -93.53028499999999},
      fullAddress: "7905 Great Plains Blvd Ste 130, Chanhassen, MN 55317, USA",
      street: "7905 Great Plains Blvd Ste 130",
      city: "Chanhassen",
      state: "MN",
      zip: '55317',
      url: 'https://locations.smashburger.com/united-states/mn/chanhassen/7905-great-plains-blvd',      
    },
    {
      name: "Buffalo Wild Wings",
      location: {lat: 44.8594136, lng: -93.5343053},
      fullAddress: "550 W 79th St, Chanhassen, MN 55317, USA",
      street: "550 W 79th St",
      city: "Chanhassen",
      state: "MN",
      zip: '55317',
      url: 'https://www.buffalowildwings.com/en/locations/detail/0088',      
    },
    {
      name: "Kai's Sushi & Grill Chanhassen",
      location: {lat: 44.8627453, lng: -93.5355888},
      fullAddress: "586 W 78th St, Chanhassen, MN 55317, USA",
      street: "586 W 78th St",
      city: "Chanhassen",
      state: "MN",
      zip: '55317',
      url: 'http://kaisushigrill.com/default.aspx',      
    },
    {
      name: "Axel's Restaurant Chanhassen",
      location: {lat: 44.8624716, lng: -93.5347458},
      fullAddress: "560 W 78th St, Chanhassen, MN 55317, USA",
      street: "560 W 78th St",
      city: "Chanhassen",
      state: "MN",
      zip: '55317',
      url: 'https://axelsrestaurants.com/locations/chanhassen/',      
    },
    {
    name: "Davanni's Pizza & Hot Hoagies",
      location: {lat: 44.8567535, lng: -93.53273809999999},
      fullAddress: "464 Lake Dr, Chanhassen, MN 55317, USA",
      street: "464 Lake Dr",
      city: "Chanhassen",
      state: "MN",
      zip: '55317',
      url: 'https://www.davannis.com/location/chanhassen/',      
      }
]
  
  state = {
    lat: 44.85994 ,
    lon: -93.53345,
    zoom: 16,
    allLocations: this.locations,
    open: false,
    filtered: null
}

// holds filtered state until filtered
componentDidMount = () => {
  this.setState({
    ...this.state,
    filtered: this.filterLocations(this.state.allLocations, "")
  });
}

styles = {
  menuButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: '#e74c3c',
    border: 'none',
    width: '5rem',
    height: '5rem'
  },
  hide: {
    display: 'none'
  },
  header: {
    marginTop: "0px"
  }
};

// Toggles drawer state back and forth between true and false to open and close drawer
toggleDrawer = () => {
  this.setState({
    open: !this.state.open
  });
}
// Places filtered array into the filterd state
updateQuery = (query) => {
  this.setState({
    ...this.state,
    selectedIndex: null,
    filtered: this.filterLocations(this.state.allLocations, query)
  });
}
// Changes selectedIndex state to the currently clicked "location list item" and then closes drawer
clickItem = (index) => {
  this.setState({ selectedIndex: index, open: !this.state.open})
}

// filters locations names by the query passed in and returns 
filterLocations = (locations, query) => {
  return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
}

  render() {
    return (
    <div className="App">
    <header>
      <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
       <i className="fa fa-bars"></i>
      </button>
      <h1>Chanhassen MN Restaurants</h1>
    </header>
    <MapContainer
      lat={this.state.lat}
      lon={this.state.lon}
      zoom={this.state.zoom}
      locations={this.state.filtered}
      clickItem={this.clickItem}
      selectedIndex={this.state.selectedIndex}/>
    <ListDrawer
        locations={this.state.filtered}
        open={this.state.open}
        toggleDrawer={this.toggleDrawer}
        filterLocations={this.updateQuery}
        clickItem={this.clickItem}/>
    </div>
      
    );
  }
}

export default App;
