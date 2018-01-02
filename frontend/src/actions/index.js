import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  UPDATE_POST,
  CREATE_POST,
  ADD_COMMENT,
  ADD_VOTE,
  API_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3001';
const AUTH_HEADER = {
  headers: { 'Authorization': 'vikrampatil' }
};

export function fetchPost() {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: FETCH_POST, categories: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function createPost() {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: CREATE_POST, categories: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function updatePost() {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: UPDATE_POST, categories: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function loadPosts() {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/posts`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: GET_POSTS, posts: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function loadCategories() {  
  return function(dispatch, getState) {
    fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(jsonResult => {
        dispatch({type: GET_CATEGORIES, payload: jsonResult});
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function addComment() {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: ADD_COMMENT, categories: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function addVote() {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: ADD_VOTE, categories: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}


export function apiError(error) {
  return {
    type: API_ERROR,
    payload: error
  };
}