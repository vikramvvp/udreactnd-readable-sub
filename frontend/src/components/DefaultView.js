import React, { Component } from 'react';

import CategoriesList from './CategoriesList';
import PostsList from './PostsList';


class DefaultView extends Component {
  render() {
    return (
      <div class="container">
      <div class="row">
        <PostsList />
        <div class="col-md-4">
          <div class="card my-4">
            <div class="card-body">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Add New Post</button>
              </span>
            </div>
          </div>
  
          <CategoriesList />
        </div>
  
      </div>
    </div>
    );
  }
}

export default DefaultView;
