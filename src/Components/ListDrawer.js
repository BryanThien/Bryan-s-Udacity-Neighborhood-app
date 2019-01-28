import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class ListDrawer extends Component {
    state = {
        open: false,
        query: ""
    }
// takes in query searched by user and sends it to filter the location list items
    updateQuery = (newQuery) => {
        this.setState({query: newQuery});
        this.props.filterLocations(newQuery);
    }

    

render = () => {
    const drawerStyle = {
        width: '1rem'
    };
    return (
        <div>
            <Drawer style={drawerStyle} open={this.props.open} onClose={this.props.toggleDrawer}>
                <div className="list">
                <div className="searchHeadingContainer">
                    <h3 className="searchHeading">Chanhassen Restaruant Location Search</h3>
                </div>
                <label for="filter">Search:</label>
                    <input
                        aria-label="Search"
                        className="filterEntry"
                        type="text"
                        placeholder="Filter list"
                        id="filter"
                        name="filter"
                        onChange={e => this.updateQuery(e.target.value)}
                        value={this.state.query}/>
                        <div className = "searchListContainer">
                        <ul className="noBullets">
                            {this.props.locations && this
                                .props
                                .locations
                                .map((location, index) => {
                                    return (
                                        <li className="listItem" key={index}>
                                            <button className="listButton" key={index} onClick={e => this.props.clickItem(index)}>{location.name}</button>
                                        </li>)                                   
                                })
                            }
                    </ul>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

}
export default ListDrawer;