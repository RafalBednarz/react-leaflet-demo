import React, { Component, createRef } from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class AddLocation extends Component {

  refmarker = createRef()
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: 52.10,
        lng: 18.62,
      },
      marker: {
        lat: 52.10,
        lng: 18.62,
      },
      zoom: 6,
      draggable: true,
    }
  }

  refmarker = createRef()
  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable })
  }

  updatePosition = () => {
    const marker = this.refmarker.current
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
      })
    }
  }

  addLocation = () => {
    console.log("addlocation")
    console.log("longitute" + this.state.marker.lat)
    console.log("latitude" + this.state.marker.lng)
    fetch('http://localhost:8080/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": "nowy apartament",
        "city": "KRAKOW",
        "price": 1000,
        "type": "FLAT",
        "latitudex": String(this.state.marker.lat),
        "longitudey": String(this.state.marker.lng)
      })
    })
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng]
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]
    const token = 'pk.eyJ1IjoicmJlZG5hcnoiLCJhIjoiY2psdmpmY3dmMHFreTNxcXZwbWQ0b2d5ZyJ9.TnVzeqFz-gaTNhfD6nFulQ';

    return (
      <div>
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='OSM'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmJlZG5hcnoiLCJhIjoiY2psdmpmY3dmMHFreTNxcXZwbWQ0b2d5ZyJ9.TnVzeqFz-gaTNhfD6nFulQ"
        />
        <Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}>
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
            </span>
          </Popup>
        </Marker>
      </Map>
      <button id="addLocation" onClick={this.addLocation}>Add Location</button>
      </div>
    )
  }
}

export default AddLocation
