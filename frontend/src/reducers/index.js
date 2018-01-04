import { combineReducers } from 'redux';
import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  SELECT_SORTCRITERIA,
  SELECT_CATEGORY,
  API_ERROR,
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
    case SELECT_CATEGORY:
      return {...state, 
        category: action.payload
      }
    case FETCH_POST:
      return {...state, 
        post: action.payload
      }
    case FETCH_COMMENTS:
      console.log('action', action)
      return {...state, 
        comments: action.payload
      };
    case API_ERROR:
      return state;
    default:
      return state;
  }
}



export default combineReducers ({
  blog
});