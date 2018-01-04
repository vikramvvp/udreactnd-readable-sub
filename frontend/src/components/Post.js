import React from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

export default function Post({ post, onUpdateVoteScore }) {
  if (post) {
    return (
      <div>
        <h1 className="mt-4">{post.title}</h1>
        <p className="lead">
          by {post.author}
        </p>
        <hr />
        <p>
          Posted on Posted on {(new Date(post.timestamp)).toUTCString()} by {post.author}
        </p>
        <hr />
        <p>
          <button
            className='icon-btn'
            onClick={onUpdateVoteScore('up')}>
            <FaThumbsOUp size={30} />
          </button>&nbsp;&nbsp;
        <span>{post.voteScore}</span>&nbsp;&nbsp;
        <button
            className='icon-btn'
            onClick={onUpdateVoteScore('down')}>
            <FaThumbsODown size={30} />
          </button>
        </p>
        <hr />
        <p >{post.body}</p>
        <hr />
      </div>
    )
  }
  else {
    return (<div></div>)
  }
}


