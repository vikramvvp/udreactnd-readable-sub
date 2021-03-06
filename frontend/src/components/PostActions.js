import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const PostActions = ({ clickItems, onDeletePost, match }) => (
  <div className="card my-4">
    <h5 className="card-header">Actions</h5>
    <div className="card-body">
      <div className="btn-group-vertical">
        {_.indexOf(clickItems, 'list') !== -1 ?
          <Link className="btn btn-secondary" to='/all' >Back to list</Link> : ""}
        {_.indexOf(clickItems, 'add') !== -1 ?
          <Link className="btn btn-secondary" to='/posts/new' >Add New Post</Link> : ""}
        {_.indexOf(clickItems, 'edit') !== -1 ?
          <Link className="btn btn-secondary" to={`/posts/edit/${match.params.id}`} >Edit Post</Link> : ""}
        {_.indexOf(clickItems, 'delete') !== -1 ?
          <a className="btn btn-secondary" href="" role="button"
            onClick={(e) => { e.preventDefault(); onDeletePost('postactions', match.params.id) }}>
            Delete Post</a> : ""}
      </div>
    </div>
  </div>
)

PostActions.propTypes = {
  clickItems: PropTypes.array.isRequired,
  onDeletePost: PropTypes.func
}

export default withRouter(PostActions);
