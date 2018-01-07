import _ from 'lodash';
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux'

import * as type from '../actions/types';


function blog(state={category: "all", sortCriteria:{sortField:"title", sortOrder:"asc"}}, action) {
  switch(action.type) {
    case type.GET_CATEGORIES:
      return {...state,
        categories: action.payload.categories};
    case type.GET_POSTS:
      return {...state,
        category: action.category,
        posts: action.posts,
        post: {}
      };
    case type.FETCH_POST:
      return {...state, 
        post: action.payload
      }
    case type.GET_COMMENTS:
      let comments = action.payload;
      return {...state, 
        comments: _.orderBy(comments, ['timestamp','author','body'], ['desc','asc','asc'])
      };
    case type.SELECT_SORTCRITERIA:
      return {...state,
        sortCriteria: { 
          sortField: action.payload.split('|')[0], 
          sortOrder: action.payload.split('|')[1]
        }
      };
    case type.SELECT_CATEGORY:
      return {...state, 
        category: action.payload
      }
    case type.API_ERROR:
      return state;
    default:
      return state;
  }
}



export default combineReducers ({
  blog,
  router: routerReducer
});