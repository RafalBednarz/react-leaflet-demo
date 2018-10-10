import React, { Component } from 'react';
import PropTypes from 'prop-types';

// the UI component for filtering the subway entrances by subway line
class Filter extends Component {
    getContent(event) {
        this.props.callback(event.target.value);
    }

  // this is the JSX that will become the Filter UI in the DOM, notice it looks pretty similar to HTML
  // notice in the select element onChange is set to the updateFilter method
  // thus when a user selects a new subway line to view, the component passes the new filter value
  // to the parent component, Map, which reloads the GeoJSON data with the current filter value
    render() {
        return (
            <div className="filterCities">
                <h3>Cena</h3>

                <select className="form-control selcls" defaultValue="*"
                        type="select"
                        name="filterlines"
                        onChange={this.getContent.bind(this)}>
                    <option value="*" key="1">Wszytkie</option>
                    <option value="150" key="2">Do 150</option>
                    <option value="250" key="3">Do 250</option>
                    <option value="350" key="4">Do 350</option>
                </select>
            </div>
        );
    }

}
Filter.protoTypes = {
    callback : PropTypes.func,
}
export default Filter;

