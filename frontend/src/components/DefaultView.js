import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import VisiblePostsList from '../containers/VisiblePostsList';

class DefaultView extends Component {
  render() {
    return (
      <div className="row">
        <VisiblePostsList />
        <div className="col-md-4">
          <div className="card my-4">
            <div className="card-body">
              <span className="input-group-btn">
                <Link className="btn btn-primary" to='/postaddedit' >Add New Post</Link>
              </span>
            </div>
          </div>
          <Categories />
        </div>
      </div>
    );
  }
}

export default DefaultView;
