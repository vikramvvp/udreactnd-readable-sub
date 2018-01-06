import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'

class CommentForm extends Component {
  state = {
    commentText: "",
    commentAuthor: ""
  }

  componentDidMount() {
    if (this.props.comment) {
      this.setState({
        commentText: this.props.comment.body,
        commentAuthor: this.props.comment.author
      });
    }
  }

  onFormSubmit = (e,existingComment) => {
    let saveType = (existingComment.id === "") ? "add" : "edit";
    e.preventDefault(); 
    let updatedComment = {
      id: (saveType === "add" ? uuidv4() : existingComment.id),
      body: this.state.commentText, 
      author: (saveType === "add" ? this.state.commentAuthor : existingComment.author)
    }
    this.props.onSubmit(saveType, updatedComment);
    this.props.onReset();
  }

  handleChange = e => {
    switch(e.target.id){
      case "commentText": 
        this.setState({commentText: e.target.value});
        break;
      case "commentAuthor":
        this.setState({commentAuthor: e.target.value});
        break;
      default:
    }
    
  }
  render() {
    let { comment, onReset } = this.props;
    if (!comment) {
      comment = { id:"", body: "", author: "" }
    }
    return (
      <div className="card my-4">
        <h5 className="card-header">{(comment.author === "") ? "Leave a Comment:" : "Edit the comment:"}</h5>
        <div className="card-body">
          <form onSubmit={e => {this.onFormSubmit(e, comment)}}>
            <div className="form-group">
              <label htmlFor="commentText">Comment Text</label>
              <textarea id="commentText" value={this.state.commentText} onChange={this.handleChange} className="form-control" rows="3" ></textarea>
            </div>
            {(comment.author === "") ?
              <div className="form-group">
                <label htmlFor="commentAuthor">Author</label>
                <input id="commentAuthor" value={this.state.commentAuthor} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter name or email"  />
              </div>
              : ""}
            <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
        <button type="cancel" onClick={e => { e.preventDefault(); onReset(); }} className="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CommentForm;