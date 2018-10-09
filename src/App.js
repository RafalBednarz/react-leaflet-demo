import React, { Component } from 'react';
import Map from './Map';
import Button from './Button';

// App component
class App extends Component {
    render() {
        return (
            <div id="mapUI">
                <Map/>
            <Button/>
            </div>
        );
    }
}

export default App;
