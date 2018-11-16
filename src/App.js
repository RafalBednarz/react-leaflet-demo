import React, { Component } from 'react';
import Map from './Map';
import Button from './Button';
import Filter from './Filter';
import { fetchLocations } from './actions/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
    this.state= {
      priceFilter : "*"
    };
  }

  static propTypes = {
    price: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, price } = this.props;
    dispatch(fetchLocations(price));
  }

  handleChange(params) {
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
                        <Filter callback={this.handleChange.bind(this)} />
                        <Button/>
                    </div>
                </div>
            </div>
        );
  }
}

const mapStateToProps = state => {

  const {
    price,
    isFetching,
    items: locations
  } = locations || {
    price: '*',
    isFetching: false,
    items: []
  }
;
  return {
    price,
    isFetching,
    locations
  };
};

export default connect(mapStateToProps)(App);
