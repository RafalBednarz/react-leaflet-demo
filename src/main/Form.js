import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Typeahead} from 'react-bootstrap-typeahead'
import {MY_CITIES} from '../Cities'

const Form = ({ handleSubmit, onChange}) => (

  <div className="filterCities">
    <form onSubmit={handleSubmit}>
    <div>
    <label>Miasto</label>
    <Typeahead
      labelKey="city"
      options={MY_CITIES}
    />
      <label>Cena</label>
      <div>
        <Field name="filterlines" component="select">
          <option />
          <option value="150">150</option>
          <option value="250">250</option>
          <option value="350">350</option>
        </Field>
      </div>
      </div>
      <div>
        <button type="submit">Szukaj</button>
      </div>
    </form>
  </div>
)

export default reduxForm({
  form: "simple", // a unique identifier for this form
})(Form)
