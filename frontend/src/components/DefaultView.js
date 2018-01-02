import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import PostAddEdit from './PostAddEdit';

class DefaultView extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path='/' render={() => (
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
        ) } />

        <Route path='/postaddedit' render={({ history }) => (
          <PostAddEdit />
        )} />
      </div>
    );
  }
}

export default DefaultView;
