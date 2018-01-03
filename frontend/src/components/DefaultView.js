import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';

class DefaultView extends Component {
  render() {
    return (
      <div className="row">
        <PostsList />
        <div className="col-md-4">
          <div className="card my-4">
            <div className="card-body">
              <span className="input-group-btn">
                <Link className="btn btn-primary" to='/postaddedit' >Add New Post</Link>
              </span>
            </div>
          </div>
          <CategoriesList />
        </div>
      </div>
    );
  }
}

export default DefaultView;
