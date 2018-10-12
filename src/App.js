import React, { Component } from 'react';
import Map from './Map';
import Button from './Button';
import Filter from './Filter';

class App extends Component {

  constructor(){
    super();
    this.state= {
      priceFilter : "*"
    };
  }

  updateMap(params) {
    console.log('App updateMap - price filter: ' + params);
    this.setState({
      priceFilter: params
    });
  }

  render() {
    return (
            <div className="container" id="appWrapper">
                <div className="row" id="mapp">
                    <div className="col-9" id="mapUI">
                        <Map priceFilter={this.state.priceFilter}/>
                    </div>
                    <div className="col-3">
                        <Filter callback={this.updateMap.bind(this)} />
                        <Button/>
                    </div>
                </div>
            </div>
        );
  }
}

export default App;
