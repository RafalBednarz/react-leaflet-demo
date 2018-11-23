import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Form = ({ handleSubmit}) => (

    <div className="filterCities">

        <form onSubmit={handleSubmit}>
        <div>
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
