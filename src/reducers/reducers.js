import { combineReducers } from 'redux';
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from '../actions/actions';

function locations(
  state = {
    price: '*',
    isFetching: false,
    items: []
  },
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
        items: action.locations,
      };
    default:
      return state;
  }
}

export default locations;
