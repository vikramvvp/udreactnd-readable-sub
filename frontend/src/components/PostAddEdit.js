import _ from 'lodash'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4'

class PostAddEdit extends Component {
  constructor() {
    super();
    this.state = {
      postText: "",
      postTitle: "",
      postAuthor: "",
      postCategory: ""
    }
  }

  componentDidMount() {
    if (this.props.post.id) {
      this.setState({
        postTitle: this.props.post.title,
        postCategory: this.props.post.category,
        postText: this.props.post.body,
        postAuthor: this.props.post.author
      });
    }
  }

  onFormSubmit = (e,existingPost) => {
    let saveType = (existingPost.id) ? "edit" : "add";
    e.preventDefault(); 
    let updatedPost = {
      title: this.state.postTitle,
      id: (saveType === "add" ? uuidv4() : existingPost.id),
      body: this.state.postText, 
      author: this.state.postAuthor,
      category: this.state.postCategory
    }
    this.props.onSavePost(saveType, updatedPost);
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
      case "postCategory":
        this.setState({postCategory: e.target.value});
        break;
      default:
    }
    
  }
  render() {
    let { post, categories, onReset } = this.props;
    
    return (
      <div className="card my-4">
        <h5 className="card-header">{(!post.id) ? "Create a Post:" : "Edit the post:"}</h5>
        <div className="card-body">
          <form onSubmit={e => {this.onFormSubmit(e, post)}}>
            <div className="form-group">
              <label htmlFor="postTitle">Post Title</label>
              <input id="postTitle" value={this.state.postTitle} onChange={this.handleChange} placeholder="Enter post title" className="form-control" />
            </div>
            <div className="form-group">
            <label htmlFor="postAuthor">Author</label>
            {(!post.id) ?
              <input id="postAuthor" value={this.state.postAuthor} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter name or email"  />
            : <input id="postAuthor" className="form-control" type="text" value={post.author} readOnly />}
          </div>
            <div className="form-group">
              <label htmlFor="postCategory">Post Category</label>
              {(!post.id) ?
              <select id="postCategory" value={this.state.postCategory} className="form-control"
                onChange={e => {e.preventDefault(); this.handleChange(e);}}>
                {_.map(categories, ({name, path}) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              :<input id="postCategory" className="form-control" type="text" value={post.category} readOnly />}
            </div>
            <div className="form-group">
              <label htmlFor="postText">Post Text</label>
              <textarea id="postText" value={this.state.postText} onChange={this.handleChange} className="form-control" rows="3" placeholder="Enter post body" ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
            <button type="cancel" onClick={e => { e.preventDefault(); onReset((!post.id ? "" : post.id)); }} className="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

PostAddEdit.propTypes = {
  post: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSavePost: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default PostAddEdit;