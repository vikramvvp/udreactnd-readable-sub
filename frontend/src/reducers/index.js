import { combineReducers } from 'redux';
import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  UPDATE_POST,
  CREATE_POST,
  ADD_COMMENT,
  ADD_VOTE,
  API_ERROR
} from '../actions/types';


function blogPost(state={}, action) {
  switch(action.type) {
    case GET_CATEGORIES:
      return {...state,
        categories: action.payload.categories};
    case GET_POSTS:
      console.log('action',action);
      return {...state,
        posts: action.posts};
    case FETCH_POST:
      return state;
    case UPDATE_POST:
      return state;
    case CREATE_POST:
      return state;
    case ADD_COMMENT:
      return state;
    case ADD_VOTE:
      return state;
    case API_ERROR:
      return state;
    default:
      return state;
  }
}

function comment(state={}, action) {
  switch(action.type) {
    case ADD_COMMENT:
      return state;
    default:
      return state;
  }
}

export default combineReducers ({
  blogPost,
  comment
});