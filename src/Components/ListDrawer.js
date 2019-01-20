import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class ListDrawer extends Component {
    state = {
        open: false,
        query: ""
    }

    updateQuery = (newQuery) => {
        this.setState({query: newQuery});
    }


render = () => {
    return (
        <div>
            <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
                <div className="list">
                <div className="searchHeadingContainer">
                    <h3 className="searchHeading">Chanhassen Restaruant Location Search</h3>
                </div>
                    <input
                        className="filterEntry"
                        type="text"
                        placeholder="filterList"
                        name="filter"
                        onChange={e => this.updateQuery(e.target.value)}
                        value={this.state.query}/>
                        <ul className="noBullets">
                            {this.props.locations && this
                                .props
                                .locations
                                .map((location, index) => {
                                    return (
                                        <li className="listItem" key={index}>
                                            <button className="listButton" key={index}>{location.name}</button>
                                        </li>)                                   
                                })
                            }
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}

}
export default ListDrawer;