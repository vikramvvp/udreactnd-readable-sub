import _ from 'lodash';
import React from 'react'
import { Link } from "react-router-dom";
import DarkThumbsUp from 'react-icons/lib/fa/thumbs-up';
import DarkComments from 'react-icons/lib/fa/comments';

const PostsList = ({ posts, category, onSortCriteriaChange }) => {
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
        {!posts ? <span>Posts not found</span> :_.map(posts, post => (
        <div className="card mb-4" key={post.id}>
          <div className="card-body">
            <Link to={`/posts/${post.id}/`}><h2 className="card-title">{post.title}</h2></Link>
            <p className="card-text">{post.body.substr(0, 150) + '...'}</p>
          </div>
          <div className="card-footer text-muted">
            Posted on {(new Date(post.timestamp)).toUTCString()} by {post.author}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<i title="Comments"><DarkComments size={20} /></i> {post.commentCount}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<i title="Vote Score"><DarkThumbsUp size={20}/></i> {post.voteScore}
          </div>
        </div>
      ))}
      </div>
  )}

export default PostsList;
