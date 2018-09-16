import React from 'react';

// the UI component for filtering the subway entrances by subway line
export default (props) => {
  const { filterPrices } = props;

  // this is the JSX that will become the Filter UI in the DOM, notice it looks pretty similar to HTML
  // notice in the select element onChange is set to the updateFilter method
  // thus when a user selects a new subway line to view, the component passes the new filter value
  // to the parent component, Map, which reloads the GeoJSON data with the current filter value
  return (
    <div className="filterCities">
      <h3>Cena</h3>
      <select defaultValue="*"
        type="select"
        name="filterlines"
        onChange={(e) => filterPrices(e)}>
          <option value="*" key="1">Wszytkie</option>
          <option value="150" key="2">Do 150</option>
          <option value="250" key="3">Do 250</option>
          <option value="350" key="4">Do 350</option>
      </select>
    </div>
  );
};
