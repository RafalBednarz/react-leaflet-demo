import fetch from 'cross-fetch';

export const REQUEST_ALL_LOCATONS = 'REQUEST_LOCATIONS';

function requestPosts() {
  return {
    type: REQUEST_ALL_LOCATONS
  };
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch('http://localhost:8080/locations')
            .then(response => response.json())
            .then(json => dispatch(receivePosts(json)));
  };
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchPosts(subreddit));
  };
}
