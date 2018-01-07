import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'

class PostForm extends Component {
  state = {
    postText: "",
    postTitle: "",
    postAuthor: "",
    postCategory: ""
  }

  componentDidMount() {
    this.props.onFetchPost(this.props.postid)
    if (this.props.post) {
      this.setState({
        postTitle: this.props.post.title,

        postText: this.props.post.body,
        postAuthor: this.props.post.author
      });
    }
  }

  onFormSubmit = (e,existingPost) => {
    let saveType = (existingPost.id === "") ? "add" : "edit";
    e.preventDefault(); 
    let updatedPost = {
      id: (saveType === "add" ? uuidv4() : existingPost.id),
      body: this.state.postText, 
      author: (saveType === "add" ? this.state.postAuthor : existingPost.author)
    }
    this.props.onSubmit(saveType, updatedPost);
    this.props.onReset();
  }

  handleChange = e => {
    switch(e.target.id){
      case "postText": 
        this.setState({postText: e.target.value});
        break;
      case "postAuthor":
        this.setState({postAuthor: e.target.value});
        break;
      case "postTitle":
        this.setState({postTitle: e.target.value});
        break;
      default:
    }
    
  }
  render() {
    let { post, onReset } = this.props;
    
    // console.log('post',post)
    // console.log('this.props.match.params.id',this.props.match.params.id)

    if (!post) {
      post = { id:"", body: "", author: "" }
    }
    return (
      <div className="card my-4">
        <h5 className="card-header">{(post.id === "") ? "Create a Post:" : "Edit the post:"}</h5>
        <div className="card-body">
          <form onSubmit={e => {this.onFormSubmit(e, post)}}>
            <div className="form-group">
              <label htmlFor="postText">Post Title</label>
              <textarea id="postText" value={this.state.postTitle} onChange={this.handleChange} className="form-control" rows="3" ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="postText">Post Text</label>
              <textarea id="postText" value={this.state.postText} onChange={this.handleChange} className="form-control" rows="3" ></textarea>
            </div>
            {(post.author === "") ?
              <div className="form-group">
                <label htmlFor="postAuthor">Author</label>
                <input id="postAuthor" value={this.state.postAuthor} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter name or email"  />
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

export default PostForm;