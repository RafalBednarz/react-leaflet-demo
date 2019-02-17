import fetch from 'cross-fetch'

// action types
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS' //to begin request
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS' //when request finished

// Action creators - functions that create actions.
// In Redux, action creators simply return an action
export function fetchLocations(city, price) {
  return dispatch => {
    dispatch(requestLocations(city, price))
    return fetch(`http://localhost:8080/locations?price=${price}`)
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(city, price, json)))
  }
}

function requestLocations(city, price) {
  return {
    type: REQUEST_LOCATIONS,
    city,
    price
  }
}

function receiveLocations(city, price, json) {
  return {
    type: RECEIVE_LOCATIONS,
    city,
    price,
    geojson: json
  }
}
