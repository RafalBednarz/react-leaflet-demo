import React, { Component } from 'react';

class Filter extends Component {
  getContent(event) {
    this.props.callback(event.target.value);
  }

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
export default Filter;
