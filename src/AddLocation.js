import React, { Component } from 'react'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

var options = {
  center: [52.10418, 18.62987],
  zoom: 10
}

let config = {}
const token = 'pk.eyJ1IjoicmJlZG5hcnoiLCJhIjoiY2psdmpmY3dmMHFreTNxcXZwbWQ0b2d5ZyJ9.TnVzeqFz-gaTNhfD6nFulQ'
config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}@2x?access_token=' + token,
  params: {
    minZoom: 2,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    id: '',
    accessToken: ''
  }
}



class AddLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      tileLayer: null
    }
    this._mapNode = null
  }

  componentDidMount() {
    // create the Leaflet map object
    console.log('componentDidMount')
    if (!this.state.map) this.init(this._mapNode)
    console.log("finished componentDidMount")
  }

  addMarker(map) { L.marker([52.10418, 18.62987], {title: "MyPoint", alt: "The Big I", draggable: true})
      .addTo(map)
      .on('dragend', function() {
        var coord = String(myMarker.getLatLng()).split(',')
        console.log(coord)
        var lat = coord[0].split('(')
        console.log(lat)
        var lng = coord[1].split(')')
        console.log(lng)
        //myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".")
      })
  }
  init(id) {
    console.log("entered init")
    if (this.state.map) return
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, options)
    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map)
    this.addMarker(map)
    // set our state to include the tile layer
    this.setState({ map, tileLayer })
  }

  render() {
    return (
      <div ref={(node) => this._mapNode = node} id="mapUI" />
    )
  }
}

export default AddLocation
