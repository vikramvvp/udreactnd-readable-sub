import React from 'react'

export default function CommentForm({comment, onSubmit, onReset}) {
  if (!comment) {
    comment = {body:"", author:""}
  }
  return (
  <div className="card my-4">
    <h5 className="card-header">{(comment.author === "") ? "Leave a Comment:" : "Edit the comment:"}</h5>
    <div className="card-body">
      <form onSubmit={onSubmit()}>
        <div className="form-group">
          <label for="commentText">Comment Text</label>
          <textarea id="commentText" className="form-control" rows="3" value={comment.body}></textarea>
        </div>
        {(comment.author === "") ? 
        <div className="form-group">
          <label for="commentAuthor">Author</label>
          <input type="text" class="form-control" id="commentAuthor" placeholder="Enter name or email" value="" />
        </div>
          :""}
        <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
        <button type="cancel" onClick={e=>{e.preventDefault(); onReset(); }} className="btn btn-secondary">Cancel</button>
      </form>
    </div>
  </div>
  )
}
