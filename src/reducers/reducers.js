import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from '../actions/actions'
import { reducer as reduxFormReducer } from 'redux-form'
import { combineReducers } from 'redux'

function locations(
  state = { isFetching: false },
  action
) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return {
        city: action.city,
        price: action.price,
        isFetching: true,
      }
    case RECEIVE_LOCATIONS:
      return {
        city: action.city,
        price: action.price,
        isFetching: false,
        geojson: action.geojson,
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  locations
})
export default reducer
