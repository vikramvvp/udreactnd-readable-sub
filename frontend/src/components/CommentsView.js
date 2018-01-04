import React from 'react';
import _ from 'lodash';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

export default function CommentsView({ comments, onUpdateVoteScore }) {
  return (<div className="card">
  <h5 className="card-header">Comments:</h5>
  <div className="card-body">
    
    {!comments ? <span>Be the first to comment!</span> : _.map(comments, ({ id, timestamp, body, voteScore, author }) => (
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="card-title">By: {author}</h6>
            <h7 className="card-subtitle text-muted"><p>
              Posted on {(new Date(timestamp)).toUTCString()}
              &nbsp;&nbsp;&#124;&nbsp;&nbsp;
              <a class="btn btn-outline-secondary" href="" role="button"
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('up', id) }}>
                <FaThumbsOUp size={15} />
              </a>&nbsp;&nbsp;
              <span>{voteScore}</span>&nbsp;&nbsp;
              <a class="btn btn-outline-secondary" href="" role="button"
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('down', id) }}>
                <FaThumbsODown size={15} />
              </a>
            </p></h7>
            <p>{body}</p>
          </div>
          <div className="card-footer text-muted">
            <div className="btn-group">
              <a class="btn btn-secondary btn-sm" href="" role="button"
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('down', id) }}>
                Edit
              </a>
              <a class="btn btn-secondary btn-sm" href="" role="button"
                onClick={(e) => { e.preventDefault(); onUpdateVoteScore('down', id) }}>
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