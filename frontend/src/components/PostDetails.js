import React from 'react';
import ShowPostActions from '../containers/ShowPostActions';
import ShowPost from '../containers/ShowPost';
import ShowComments from '../containers/ShowComments';

export default function PostDetails() {
  return (
    <div className="row">
      <div className="col-lg-9">
        <ShowPost />
        <ShowComments />
      </div>
      <div className="col-md-3">
        <ShowPostActions clickItems={['list','edit','delete']} />
      </div>
    </div>
  )
}