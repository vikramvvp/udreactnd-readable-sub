import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import DarkComments from 'react-icons/lib/fa/comments';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash';

const PostsList = ({ posts, category, onSortCriteriaChange, onUpdateVoteScore, onDeletePost }) => {
  return (
      <div className="col-md-8">
        <h1 className="my-4">Posts List <small>- {category}</small></h1>
        <div className="dropdown text-right">
        Sort By: <select 
          onChange={event => {onSortCriteriaChange(event.target.value)}}>
          <option value="title|asc">Title - ascending</option>
          <option value="title|desc">Title - descending</option>
          <option value="voteScore|asc">Vote Score - ascending</option>
          <option value="voteScore|desc">Vote Score - descending</option>
          <option value="timestamp|asc">Date Time - ascending</option>
          <option value="timestamp|desc">Date Time - descending</option>
        </select>
        </div>
        {!posts || posts.length === 0 ? <span>Posts not found</span> :_.map(posts, post => (
        <div className="card mb-4" key={post.id}>
          <div className="card-body">
            <Link to={`/${post.category}/${post.id}/`}><h2 className="card-title">{post.title}</h2></Link>
            <p className="text-muted">Posted on {(new Date(post.timestamp)).toUTCString()} by {post.author}&nbsp;&nbsp;&#124;&nbsp;&nbsp;Category: {post.category}</p>
            <p className="card-text">{post.body.substr(0, 150) + '...'}</p>
          </div>
          <div className="card-footer text-muted">
            <i title="Comments"><DarkComments size={20} /></i> {post.commentCount}&nbsp;&nbsp;&#124;&nbsp;&nbsp;
            <a href="" role="button"
                title="Vote Up"
                className='btn btn-outline-secondary'
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('postlist','upVote', post.id)}}>
                <FaThumbsOUp size={15} />
              </a>&nbsp;&nbsp;
            <span>{post.voteScore}</span>&nbsp;&nbsp;
            <a href="" role="button"
              title="Vote Down"
              className='btn btn-outline-secondary'
              onClick={(e) => { e.preventDefault(); onUpdateVoteScore('postlist','downVote', post.id)}}>
              <FaThumbsODown size={15} />
            </a>&nbsp;&nbsp;&#124;&nbsp;&nbsp;
            <Link title="Edit Post" className="btn btn-outline-secondary" to={`/posts/edit/${post.id}`} ><FaEdit size={15} /></Link>&nbsp;&nbsp;&#124;&nbsp;&nbsp;
            <a href="" role="button"
              title="Delete Post"
              className='btn btn-outline-secondary'
              onClick={(e) => { e.preventDefault(); onDeletePost('postlist', post.id) }}>
              <FaTrash size={15} />
            </a>
            
          </div>
        </div>
      ))}
      </div>
  )}

PostsList.propTypes = {
  posts: PropTypes.array,
  category: PropTypes.string.isRequired,
  onSortCriteriaChange: PropTypes.func.isRequired,
  onUpdateVoteScore: PropTypes.func.isRequired
}

export default PostsList;
