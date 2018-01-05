import React from 'react';
import _ from 'lodash';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

export default function CommentsView({ comments, onUpdateVoteScore, onEditcomment, onDeleteComment }) {
  return (<div className="card">
  <h5 className="card-header">Comments:</h5>
  <div className="card-body">
    
    {!comments ? <span>Be the first to comment!</span> : _.map(comments, ({ id, timestamp, body, voteScore, author }) => (
        <div className="card mb-4" key={id}>
          <div className="card-body">
            <h6 className="card-title">By: {author}</h6>
            <h6 className="card-subtitle text-muted"><p>
              Posted on {(new Date(timestamp)).toUTCString()}
              &nbsp;&nbsp;&#124;&nbsp;&nbsp;
              <a className="btn btn-outline-secondary" href="" role="button"
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('upVote', id) }}>
                <FaThumbsOUp size={15} />
              </a>&nbsp;&nbsp;
              <span>{voteScore}</span>&nbsp;&nbsp;
              <a className="btn btn-outline-secondary" href="" role="button"
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('downVote', id) }}>
                <FaThumbsODown size={15} />
              </a>
            </p></h6>
            <p>{body}</p>
          </div>
          <div className="card-footer text-muted">
            <div className="btn-group">
              <a className="btn btn-secondary btn-sm" href="" role="button"
                onClick={(e) => { e.preventDefault(); onEditcomment(id) }}>
                Edit
              </a>
              <a className="btn btn-secondary btn-sm" href="" role="button"
                onClick={(e) => { e.preventDefault(); onDeleteComment(id) }}>
                Delete
              </a>
            </div>
          </div>
        </div>
      ))}
      </div>
  </div>

  )
}