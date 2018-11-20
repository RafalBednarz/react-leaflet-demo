import React from 'react';

const Filter = ({ value, onChange, options}) => (

    <div className="filterCities">
        <h3>{value}</h3>
          <select className="form-control selcls"
                  type="select"
                  name="filterlines"
                  onChange={e => onChange(e.target.value)}
                  value={value}>
                  {options.map(option =>
                    <option value={option} key={option}>
                      {option}
                    </option>)
                  }
          </select>

    </div>
);

export default Filter;
