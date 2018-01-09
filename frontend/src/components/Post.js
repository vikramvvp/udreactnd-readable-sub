import React from 'react';
import PropTypes from 'prop-types';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import DarkComments from 'react-icons/lib/fa/comments';
import {Link} from 'react-router-dom';

const Post = ({ post, onUpdateVoteScore }) => {
  if (post) {
    return (
      <div>
        <h1 className="mt-4">{post.title}</h1>
        <p className="lead">
          by {post.author}&nbsp;&nbsp;&#124;&nbsp;&nbsp;category: {post.category}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<i title="Comments"><DarkComments size={25} /></i> {post.commentCount}
        </p>
        <hr />
        <p>
          Posted on {(new Date(post.timestamp)).toUTCString()} 
          &nbsp;&nbsp;&#124;&nbsp;&nbsp;
          <a href="" role="button"
            title="Vote Up"
            className='btn btn-outline-primary'
            onClick={(e) => { e.preventDefault(); onUpdateVoteScore('post','upVote', post.id)}}>
            <FaThumbsOUp size={25} />
          </a>&nbsp;&nbsp;
        <span>{post.voteScore}</span>&nbsp;&nbsp;
        <a href="" role="button"
          title="Vote Down"
            className='btn btn-outline-primary'
            onClick={(e) => { e.preventDefault(); onUpdateVoteScore('post','downVote', post.id)}}>
            <FaThumbsODown size={25} />
          </a>
        </p>
        <hr />
        <p >{post.body}</p>
        <hr />
      </div>
    )
  }
  else {
    return (
      <div className="col-md-8">
        <h1 className="my-4">Page Not Found</h1>
        <p>Sorry, there is nothing to see here</p>
        <p><Link to="/">Back to Home</Link></p>
      </div>
    )
  }
}

Post.propTypes = {
  onUpdateVoteScore: PropTypes.func.isRequired
}

export default Post