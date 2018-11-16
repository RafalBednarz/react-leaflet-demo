import fetch from 'cross-fetch';

// action types
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'; //to begin request
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'; //when request finished

// Action creators - functions that create actions.
// In Redux, action creators simply return an action
export function fetchLocations(price) {
  return dispatch => {
    dispatch(requestLocations(price));
    return fetch(`http://localhost:8080/locations`)
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(price, json)));
  };
}

function requestLocations(price) {
  return {
    type: REQUEST_LOCATIONS,
    price
  };
}

function receiveLocations(price, json) {
  return {
    type: RECEIVE_LOCATIONS,
    price,
    items: json.data.children.map(child => child.data)
  };
}
