import fetch from 'cross-fetch';

// action types
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
export const SELECT_PRICE = 'SELECT_PRICE';

// Action creators - functions that create actions.
// In Redux, action creators simply return an action
export function selectLocations(price) {
  return {
    type: SELECT_PRICE,
    price
  };
}

export function fetchLocationsIfNeeded(price) {
  return (dispatch, getState) => {
    if (shouldFetchLocations(getState(), price)) {
      return dispatch(fetchLocations(price));
    }
  };
}

function shouldFetchLocations(state, price) {
  const locations = state.locationsByPrice[price];
  if (!locations) {
    return true;
  } else if (locations.isFetching) {
    return false;
  } else {
    return false; //didInvalidate
  }

  function fetchLocations(price) {
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
      posts: json.data.children.map(child => child.data),
      receivedAt: Date.now()
    };
  }

}
