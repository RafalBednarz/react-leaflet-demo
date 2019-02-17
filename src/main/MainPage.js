import React, { Component } from 'react'
import Map from './Map'
import Button from './Button'
import Form from './Form'
import { fetchLocations } from '../actions/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleChange(newPrice) {
    const { dispatch } = this.props
    console.log('+++ entered handleChange')
    console.log(newPrice)
    console.log("filterlines: " + newPrice.filterlines)
    console.log("filterCity: " + newPrice.filtercity)
    dispatch(fetchLocations(newPrice.filterlines))
  }

  render() {
    return (
      <div className="container" id="appWrapper">
        <div className="row" id="mapp">
          <div className="col-3">
            <Form onSubmit={this.handleChange} />
            <Button/>
          </div>
          <div className="col-9" id="mapUI">
            <Map/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { price, isFetching, geojson } = { isFetching: false }
  return { price, isFetching, geojson }
}

export default connect(mapStateToProps)(MainPage)
