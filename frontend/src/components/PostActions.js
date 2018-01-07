import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'

class PostActions extends React.Component {
  render() {
    let { clickItems, onDeletePost } = this.props;
    return (
      <div className="card my-4">
        <h5 className="card-header">Actions</h5>
        <div className="card-body">
          <div className="btn-group-vertical">
            {_.indexOf(clickItems, 'add') !== -1 ?
              <Link className="btn btn-secondary" to='/posts/new' >Add New Post</Link> : ""}
            {_.indexOf(clickItems, 'edit') !== -1 ?
            <Link className="btn btn-secondary" to={`/posts/edit/${this.props.match.params.id}`} >Edit Post</Link> : ""}
            {_.indexOf(clickItems, 'delete') !== -1 ?
              <a className="btn btn-secondary" href="" role="button"
                onClick={(e) => { e.preventDefault(); onDeletePost(this.props.match.params.id) }}>
                Delete Post</a> : ""}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostActions);
