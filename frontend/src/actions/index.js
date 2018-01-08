import _ from 'lodash';
import { push } from 'react-router-redux'
import * as type from './types';

const ROOT_URL = 'http://localhost:3001';
const AUTH_HEADER = {
  headers: { 'Authorization': 'vikrampatil' }
};

export function selectSortCriteria(sortCriteria) {
  return { type: type.SELECT_SORTCRITERIA, payload: sortCriteria }
}

export function selectCategory(category) {
  return function (dispatch, getState) {
    dispatch({ type: type.SELECT_CATEGORY, payload: category })
    dispatch(push(`/${category}`))
  }
  
}

export function deletePost(postid) {
  let options = {
    headers: {
      'Authorization': 'vikrampatil',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }
  return function (dispatch, getState) {
    return fetch(`${ROOT_URL}/posts/${postid}`, options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(post => {
        return dispatch(push('/'));
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }

}


export function savePost(saveType, post) {
  let url = '', options = {};
  if (saveType === 'edit') {
    url = `${ROOT_URL}/posts/${post.id}`
    options = {
      headers: {
        'Authorization': 'vikrampatil',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({ timestamp: Date.now(), title: post.title, body: post.body })
    }
  }
  else {
    url = `${ROOT_URL}/posts`
    options = {
      headers: {
        'Authorization': 'vikrampatil',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ id: post.id, title: post.title, timestamp: Date.now(), body: post.body, author: post.author, category: post.category })
    }
  }
  return function (dispatch, getState) {
    return fetch(url, options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(post => {
        dispatch(push(`/posts/${post.id}`))
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });

  }
}

export function deleteComment(commentid) {
  let options = {
    headers: {
      'Authorization': 'vikrampatil',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }

  return function (dispatch, getState) {
    let { blog } = getState();
    return fetch(`${ROOT_URL}/comments/${commentid}`, options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(comment => {
        dispatch({ type: type.GET_COMMENTS, payload: blog.comments.filter(c => c.id !== comment.id) });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function saveComment(saveType, comment, postid) {
  let url = '', options = {};
  if (saveType === 'edit') {
    url = `${ROOT_URL}/comments/${comment.id}`
    options = {
      headers: {
        'Authorization': 'vikrampatil',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({ timestamp: Date.now(), body: comment.body })
    }
  }
  else {
    url = `${ROOT_URL}/comments`
    options = {
      headers: {
        'Authorization': 'vikrampatil',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ id: comment.id, timestamp: Date.now(), body: comment.body, author: comment.author, parentId: postid })
    }
  }

  return function (dispatch, getState) {
    let { blog } = getState();
    return fetch(url, options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(comment => {
        dispatch({ type: type.GET_COMMENTS, payload: blog.comments.filter(c => c.id !== comment.id).concat([comment]) });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function loadCategories() {
  return function (dispatch, getState) {
    fetch(`${ROOT_URL}/categories`, AUTH_HEADER)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(jsonResult => {
        dispatch({ type: type.GET_CATEGORIES, payload: jsonResult });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function loadPosts(category) {
  return function (dispatch, getState) {
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
        dispatch({ type: type.GET_POSTS, posts, category });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function fetchPost(postid) {
  return function (dispatch, getState) {
    return fetch(`${ROOT_URL}/posts/${postid}`, AUTH_HEADER)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(jsonResult => {
        dispatch({ type: type.FETCH_POST, payload: jsonResult });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function getComments(postid) {
  return function (dispatch, getState) {
    return fetch(`${ROOT_URL}/posts/${postid}/comments`, AUTH_HEADER)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(jsonResult => {
        dispatch({ type: type.GET_COMMENTS, payload: jsonResult });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function updatePostVote(source, direction, postid) {
  const options = {
    headers: {
      'Authorization': 'vikrampatil',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ option: direction })
  }
  return function (dispatch, getState) {
    let state = getState();
    return fetch(`${ROOT_URL}/posts/${postid}`, options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(jsonResult => {
        if (source === 'postlist') {
          let updatedposts = state.blog.posts.filter(p => p.id !== jsonResult.id).concat([jsonResult]);
          return dispatch({ type: type.GET_POSTS, posts:updatedposts, category:state.blog.category });
        }
        else {
          return dispatch({ type: type.FETCH_POST, payload: jsonResult });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function updateCommentVote(direction, commentid) {
  const options = {
    headers: {
      'Authorization': 'vikrampatil',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ option: direction })
  }
  return function (dispatch, getState) {
    let { blog } = getState();
    return fetch(`${ROOT_URL}/comments/${commentid}`, options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error("request failed");
      })
      .then(comment => {
        //console.log('jsonResult',jsonResult);
        dispatch({ type: type.GET_COMMENTS, payload: blog.comments.filter(c => c.id !== comment.id).concat([comment]) });
      })
      .catch(err => {
        console.log(err);
        dispatch(apiError('Error in getting categories'));
      });
  }
}

export function apiError(error) {
  return {
    type: type.API_ERROR,
    payload: error
  };
}