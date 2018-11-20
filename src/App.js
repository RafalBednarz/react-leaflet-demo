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
    this.handleChange = this.handleChange.bind(this);
    this.state= {
      priceFilter : "*"
    };
  }

  static propTypes = {
    price: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, price } = this.props;
    dispatch(fetchLocations(price));
  }

  handleChange(newPrice) {
    const { dispatch, price } = this.props;
    dispatch(fetchLocations(newPrice));
  }

  render() {
    return (
            <div className="container" id="appWrapper">
                <div className="row" id="mapp">
                    <div className="col-9" id="mapUI">
                        <Map priceFilter={this.state.priceFilter}/>
                    </div>
                    <div className="col-3">
                        <Filter value={"cena"}
                                onChange={this.handleChange}
                                options={['*', '150', '250', '350']} />
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
