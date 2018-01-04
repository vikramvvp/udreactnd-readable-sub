import { combineReducers } from 'redux';
import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  UPDATE_POST,
  CREATE_POST,
  ADD_COMMENT,
  ADD_VOTE,
  API_ERROR,
  SELECT_SORTCRITERIA
} from '../actions/types';


function blog(state={category: "all", sortCriteria:{sortField:"title", sortOrder:"asc"}}, action) {
  switch(action.type) {
    case GET_CATEGORIES:
      return {...state,
        categories: action.payload.categories};
    case GET_POSTS:
      return {...state,
        category: action.category,
        posts: action.posts};
    case SELECT_SORTCRITERIA:
      return {...state,
        sortCriteria: { 
          sortField: action.payload.split('|')[0], 
          sortOrder: action.payload.split('|')[1]
        }
      };
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

function post(state={}, action) {
  switch(action.type) {
    case ADD_COMMENT:
      return state;
    default:
      return state;
  }
}

export default combineReducers ({
  blog,
  post
});