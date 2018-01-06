import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'

import {
  GET_CATEGORIES,
  GET_POSTS,
  FETCH_POST,
  GET_COMMENTS,
  FETCH_COMMENT,
  SELECT_SORTCRITERIA,
  SELECT_CATEGORY,
  API_ERROR
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
    case FETCH_POST:
      return {...state, 
        post: action.payload
      }
    case GET_COMMENTS:
      let comments = action.payload;
      return {...state, 
        comments: _.orderBy(comments, ['timestamp','author','body'], ['desc','asc','asc'])
      };
    case FETCH_COMMENT:
      return state;
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
    case API_ERROR:
      return state;
    default:
      return state;
  }
}



export default combineReducers ({
  blog,
  form: reduxFormReducer
});