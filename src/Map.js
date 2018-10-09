import React, { Component } from 'react';
import L from 'leaflet';
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';
// using webpack json loader we can import our geojson file like this
//import geojson from 'json!./rental_locations.geojson';

import Filter from './Filter';

// store the map configuration properties in an object,
// we could also move this to a separate file & import it if desired.
let config = {};
config.params = {
  center: [52.655769,19.938503],
  zoomControl: false,
  zoom: 6,
  maxZoom: 21,
  minZoom: 2,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};
const token = 'pk.eyJ1IjoicmJlZG5hcnoiLCJhIjoiY2psdmpmY3dmMHFreTNxcXZwbWQ0b2d5ZyJ9.TnVzeqFz-gaTNhfD6nFulQ';
config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}@2x?access_token=' + token,
  params: {
    minZoom: 2,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    id: '',
    accessToken: ''
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null, // json from API
      priceFilter: '*',
    };
    this._mapNode = null;
    this.updateMap = this.updateMap.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.filterFeatures = this.filterFeatures.bind(this);
    this.filterGeoJSONLayer = this.filterGeoJSONLayer.bind(this);
  }

  componentDidMount() {
      console.log("entered componentDidMount");
      this.getData();
      console.log("after getData");
    // create the Leaflet map object
    if (!this.state.map) this.init(this._mapNode);
      console.log("add Marker");
    //this.addMarker();
      console.log("finished componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
      console.log("entered componentDidUpdate");
      console.log("this geojson" + this.state.geojson);
      console.log("this state map " + this.state.map);
      console.log("this geojsonlayer " + this.state.geojsonLayer);
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
    if (this.state.geojson && this.state.map && !this.state.geojsonLayer) {
      // add the geojson overlay
      this.addGeoJSONLayer(this.state.geojson);
    }

    // check to see if the subway lines filter has changed
      console.log("this priceFilter " + this.state.priceFilter + " previous priceFilter " + prevState.priceFilter);
    if (this.state.priceFilter !== prevState.priceFilter) {
      // filter / re-render the geojson overlay
      this.filterGeoJSONLayer();
    }


  }

  componentWillUnmount() {
      console.log("entered componentWillUnmount");
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  getData() {
      console.log("entered getData");
      fetch('http://localhost:8080/locations')
          .then(response => response.json())
          .then(parsedJSON =>
              this.setState({geojson: parsedJSON})
          )
              .catch(error => alert('failed to fetch data', error));
      console.log("this geojson " + this.state.geojson);
  }


  updateMap(e) {
      console.log("entered updateMap");
    let priceUpTo = e.target.value;
    // change the subway line filter
    if (priceUpTo === "All lines") {
      priceUpTo = "*";
    }

    // update our state with the new filter value
    this.setState({
      priceFilter: priceUpTo
    });
  }

  addGeoJSONLayer(geojson) {
      console.log("entered addGeoJSONLayer");
    // create a native Leaflet GeoJSON SVG Layer to add as an interactive overlay to the map
    // an options object is passed to define functions for customizing the layer
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    // add our GeoJSON layer to the Leaflet map object
    geojsonLayer.addTo(this.state.map);
    // store the Leaflet GeoJSON layer in our component state for use later
    this.setState({ geojsonLayer });
    // fit the geographic extent of the GeoJSON layer within the map's bounds / viewport
    this.zoomToFeature(geojsonLayer);
  }

  filterGeoJSONLayer() {
      console.log("entered filterGeoJSONLayer");
    // clear the geojson layer of its data
    this.state.geojsonLayer.clearLayers();
    // re-add the geojson so that it filters out subway lines which do not match state.filter
    this.state.geojsonLayer.addData(this.state.geojson);
    // fit the map to the new geojson layer's geographic extent
      if(this.state.geojsonlayer) {
          this.zoomToFeature(this.state.geojsonLayer);
      }
  }


  zoomToFeature(target) {
      console.log("entered zoomToFeature");
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }

  filterFeatures(feature, layer) {
      console.log("entered filterFeatures");
    // filter the subway entrances based on the map's current search filter
    // returns true only if the filter value matches the value of feature.properties.LINE
    if (this.state.priceFilter === '*' || feature.properties.PRICE < this.state.priceFilter) {
        console.log("entered if condition. price: " + feature.properties.PRICE + " price filter " + this.state.priceFilter);
      return true;
    }
  }

  pointToLayer(feature, latlng) {
      console.log("entered pointToLayer");
    // renders our GeoJSON points as circle markers, rather than Leaflet's default image markers
    // parameters to style the GeoJSON markers
    var markerParams = {
      radius: 10,
      fillColor: 'orange',
      color: '#fff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, markerParams);
  }

  onEachFeature(feature, layer) {
      console.log("entered onEachFeature");
    if (feature.properties && feature.properties.NAME && feature.properties.CITY) {

      // assemble the HTML for the markers' popups (Leaflet's bindPopup method doesn't accept React JSX)
      const popupContent = `<h3>${feature.properties.NAME}</h3>
        <strong>Cena: </strong>${feature.properties.PRICE}`;

      // add our popups
      layer.bindPopup(popupContent);

    }
  }

  init(id) {
      console.log("entered init");
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }

  render() {
    const { priceFilter } = this.state;
    return (
      <div id="mapUI">
        {
          /* render the Filter component only after the subwayLines array has been created */
            <Filter
                curFilter={priceFilter}
                filterPrices={this.updateMap} />
        }
        <div ref={(node) => this._mapNode = node} id="map" />
      </div>
    );
  }
}

export default Map;
