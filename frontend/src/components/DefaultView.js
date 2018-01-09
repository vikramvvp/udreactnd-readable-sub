import React from 'react';
import PostActions from './PostActions';
import ShowCategories from '../containers/ShowCategories';
import VisiblePostsList from '../containers/VisiblePostsList';

const DefaultView = () => (
  <div className="row">
    <VisiblePostsList />
    <div className="col-md-3">
      <PostActions clickItems={['add']} />
      <ShowCategories />
    </div>
  </div>
)

export default DefaultView;
