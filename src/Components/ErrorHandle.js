import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
          error: null,
          errorInfo: null
        };
      
      componentDidCatch(error, errorInfo) {
        // Catch errors in any child components and re-renders with an error message
        
        this.setState({
          error: error,
          errorInfo: errorInfo
        });
      }
    
      render() {
        if (this.state.error) {
          // Fallback UI if an error occurs
          return (
            <div>
              <h2>Something Went wrong</h2>
              <p>
                {this.state.error && this.state.error.toString()}
              </p>
            </div>
          );
        }
        // component normally just renders children
        return this.props.children;
      }
    }

export default ErrorBoundary