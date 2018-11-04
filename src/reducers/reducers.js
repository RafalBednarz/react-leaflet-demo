import { combineReducers } from 'redux';
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  SELECT_PRICE
} from '../actions/actions';

function selectedLocation(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_PRICE:
      return action.price;
    default:
      return state;
  }
}

function locations(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function locationsBySubreddit(state = {}, action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        [action.price]: posts(state[action.price], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  locationsBySubreddit,
  selectedLocation
});

export default rootReducer;
