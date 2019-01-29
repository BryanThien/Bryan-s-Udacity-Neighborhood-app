import React, {Component} from 'react';

class ErrorHandle extends Component {
    state = {
        show: false,
        timeout: null
    }

    componentDidMount = () => {
        let timeout = window.setTimeout(this.showMessage, 1000);
        this.setState({timeout});
    }
    // To avoid memory leak
    componentWillUnmount = () => {
        window.clearTimeout(this.state.timeout);
    }

    showMessage = () => {
        this.setState({show: true});
    }

    render = () => {
        return (
            <div>
                {this.state.show 
                ? (
                <div>
                    <h1>Error</h1>
                    <p> Couldn't load map due to a network error. </p>
                </div>
                )
            : (<div><h1>Loading</h1></div>)    
            } </div>
        )
    }
}

export default ErrorHandle