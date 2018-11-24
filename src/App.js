import React, { Component } from 'react'
import Map from './Map'
import Button from './Button'
import Form from './Form'
import { fetchLocations } from './actions/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state= {
      priceFilter : "*"
    }
  }

  static propTypes = {
    price: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    //geojson: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log("app componentDidMount")
    const { dispatch, price } = this.props
    dispatch(fetchLocations(price))
  }

  handleChange(newPrice) {
    const { dispatch, price } = this.props
    console.log('+++')
    console.log(newPrice.filterlines)
    dispatch(fetchLocations(newPrice.filterlines))
  }

  render() {
    return (
            <div className="container" id="appWrapper">
                <div className="row" id="mapp">
                    <div className="col-9" id="mapUI">
                        <Map/>
                    </div>
                    <div className="col-3">
                        <Form onSubmit={this.handleChange} />
                        <Button/>
                    </div>
                </div>
            </div>
        )
  }
}

const mapStateToProps = state => {

  const {
    price,
    isFetching,
    geojson
  } = geojson || {
    price: '',
    isFetching: false
  }

  return {
    price,
    isFetching,
    geojson
  }
}

export default connect(mapStateToProps)(App)
