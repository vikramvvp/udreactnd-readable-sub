import _ from 'lodash';
import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  UPDATE_POST,
  CREATE_POST,
  ADD_COMMENT,
  ADD_VOTE,
  API_ERROR,
  SELECT_SORTCRITERIA,
  SELECT_CATEGORY
} from './types';

const ROOT_URL = 'http://localhost:3001';
const AUTH_HEADER = {
  headers: { 'Authorization': 'vikrampatil' }
};

export function selectSortCriteria(sortCriteria) {
  return {type: SELECT_SORTCRITERIA, payload: sortCriteria}
}

export function selectCategory(category) {
  return {type: SELECT_CATEGORY, payload: category}
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

export function loadPosts(category) {
  return function(dispatch, getState) {
    let url = `${ROOT_URL}/posts`;
    if (category && category !== 'all') {
      url = `${ROOT_URL}/${category}/posts`;
    }
    return fetch(url, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      const posts = _.orderBy(jsonResult, ['title'], ['asc']);
      dispatch({type: GET_POSTS, posts, category});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function fetchPost(postid) {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/posts/${postid}`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: FETCH_POST, payload: jsonResult});
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

export function updateVote(direction) {
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