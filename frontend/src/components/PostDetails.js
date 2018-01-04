import React from 'react';
import AddNewPost from './AddNewPost';
import ShowPost from '../containers/ShowPost';
import CommentForm from './CommentForm';
import CommentsView from './CommentsView';

export default function PostDetails() {
  return (
    <div className="row">
      <div className="col-lg-8">
        <ShowPost />
        <CommentForm />
        <CommentsView />
      </div>
      <div className="col-md-4">
        <AddNewPost actions={['add','edit']} />
      </div>
    </div>
  )
}