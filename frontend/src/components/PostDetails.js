import React from 'react';
import AddNewPost from './AddNewPost';
import ShowPost from '../containers/ShowPost';
import ShowComments from '../containers/ShowComments';

export default function PostDetails() {
  return (
    <div className="row">
      <div className="col-lg-8">
        <ShowPost />
        <ShowComments />
      </div>
      <div className="col-md-4">
        <AddNewPost actions={['add','edit']} />
      </div>
    </div>
  )
}