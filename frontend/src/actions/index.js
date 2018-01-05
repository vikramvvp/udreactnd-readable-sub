import _ from 'lodash';
import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  GET_COMMENTS,
  FETCH_COMMENT,
  API_ERROR,
  SELECT_SORTCRITERIA,
  SELECT_CATEGORY,
  SELECT_COMMENT_TO_EDIT  
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

export function editComment(commentid) {
  return function(dispatch, getState) {
    let state = getState();
    return {type: SELECT_COMMENT_TO_EDIT, payload: state.blog.comments.filter(c => c.id ===commentid)}
  }
}

export function saveComment(comment) {
  return {type: SELECT_COMMENT_TO_EDIT, payload: comment}
}

export function deleteComment(comment) {
  return {type: SELECT_COMMENT_TO_EDIT, payload: comment}
}

export function commentReset(comment) {
  return {type: SELECT_COMMENT_TO_EDIT, payload: comment}
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

export function getComments(postid) {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/posts/${postid}/comments`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: GET_COMMENTS, payload: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function fetchComment(commentid) {
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/comments/${commentid}`, AUTH_HEADER)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(jsonResult => {
      dispatch({type: FETCH_COMMENT, payload: jsonResult});
    })
    .catch(err => {
      console.log(err);
      dispatch(apiError('Error in getting categories'));
    });
  }
}

export function updatePostVote(direction, postid) {
  const options = {
    headers: { 'Authorization': 'vikrampatil',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({option: direction})}
  return function(dispatch, getState) {
    return fetch(`${ROOT_URL}/posts/${postid}`, options)
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

export function updateCommentVote(direction, commentid) {
  const options = {
    headers: { 'Authorization': 'vikrampatil',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({option: direction})}
  return function(dispatch, getState) {
    let {blog} = getState();
    return fetch(`${ROOT_URL}/comments/${commentid}`, options)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error("request failed");
    })
    .then(comment => {
      //console.log('jsonResult',jsonResult);
      dispatch({type: GET_COMMENTS, payload: blog.comments.filter(c => c.id !== comment.id).concat([comment])});
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