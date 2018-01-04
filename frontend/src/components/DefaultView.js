import React, { Component } from 'react';
import AddNewPost from './AddNewPost';
import CategoriesList from '../containers/CategoriesList';
import VisiblePostsList from '../containers/VisiblePostsList';

class DefaultView extends Component {
  render() {
    return (
      <div className="row">
        <VisiblePostsList />
        <div className="col-md-4">
          <AddNewPost actions={['add']} />
          <CategoriesList />
        </div>
      </div>
    );
  }
}

export default DefaultView;
