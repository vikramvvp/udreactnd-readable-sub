import React from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

export default function Post({ post, onUpdateVoteScore }) {
  if (post) {
    return (
      <div>
        <h1 className="mt-4">{post.title}</h1>
        <p className="lead">
          by {post.author}&nbsp;&nbsp;&#124;&nbsp;&nbsp;category: {post.category}
        </p>
        <hr />
        <p>
          Posted on {(new Date(post.timestamp)).toUTCString()} 
          &nbsp;&nbsp;&#124;&nbsp;&nbsp;
          <a href="" role="button"
            className='btn btn-outline-primary'
            onClick={(e) => { e.preventDefault(); onUpdateVoteScore('upVote', post.id)}}>
            <FaThumbsOUp size={25} />
          </a>&nbsp;&nbsp;
        <span>{post.voteScore}</span>&nbsp;&nbsp;
        <a href="" role="button"
            className='btn btn-outline-primary'
            onClick={(e) => { e.preventDefault(); onUpdateVoteScore('downVote', post.id)}}>
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
    return (<div></div>)
  }
}


