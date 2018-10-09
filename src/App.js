import React, { Component } from 'react';
import Map from './Map';
import Button from './Button';

// App component
class App extends Component {
    render() {
        return (
            <div className="container" id="appWrapper">
                <div className="row" id="mapp">
                    <div className="col-9" id="mapUI">
                        <Map/>
                    </div>
                    <div className="col-3">
                        <Button/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
