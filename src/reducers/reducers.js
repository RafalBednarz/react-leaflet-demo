import { combineReducers } from 'redux';
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from '../actions/actions';

function locations(
  state = { price: '*', isFetching: false },
  action
) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return {
        price: action.price,
        isFetching: true,
      };
    case RECEIVE_LOCATIONS:
      return {
        price: action.price,
        isFetching: false,
        geojson: action.geojson,
      };
    default:
      return state;
  }
}

export default locations;
