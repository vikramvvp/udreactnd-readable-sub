import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default function AddNewPost({actions}) {
  return (
      <div className="card my-4">
      <h5 className="card-header">Actions</h5>
        <div className="card-body">
          <div className="btn-group-vertical">
          {_.indexOf(actions, 'add') !== -1 ? 
            <Link className="btn btn-secondary" to='/posts/new' >Add New Post</Link> : ""}
          {_.indexOf(actions, 'edit') !== -1 ? 
            <Link className="btn btn-secondary" to='/posts/new' >Edit Post</Link> : ""}
          </div>
        </div>
      </div>
    
  )
}
