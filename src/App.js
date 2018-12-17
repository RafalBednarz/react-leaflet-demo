import React, { Component } from 'react'
import Map from './main/Map'
import Button from './main/Button'
import Form from './main/Form'
import { fetchLocations } from './actions/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class App extends Component {
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
  const { price, isFetching, geojson } = { isFetching: false }
  return { price, isFetching, geojson }
}

export default connect(mapStateToProps)(App)
