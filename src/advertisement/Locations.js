import React, { Component } from 'react'
import Images from './Images'

class Locations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    const { match } = this.props
    fetch(`http://localhost:8080/advertisements/${match.params.id}`)
    .then(response => response.json())
    .then(data => this.setState({ data }))
    .catch(error => alert('failed to fetch data', error))
    
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.state.data)}</p>
        <Images advertId={this.state.data}/>
      </div>
    )
  }
}

export default Locations
