import _ from 'lodash';
import React, { Component } from 'react'
import { loadPosts } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PostsList extends Component {
  componentDidMount() {
    this.props.loadPosts();
    
  }

  render() {
    return (
      <div className="col-md-8">
        <h1 className="my-4">Posts List - <small>All</small>
        </h1>
        {_.map(this.props.posts, post => (
        <div className="card mb-4" key={post.id}>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-text">{post.body.substr(0, 150) + '...'}</p>
            <Link className="btn btn-primary" to={`/post?id=${post.id}/`}>Read More &rarr;</Link>
          </div>
          <div className="card-footer text-muted">
            Posted on January 1, 2017 by {post.author}
          </div>
        </div>
      ))}
      </div>
  )}
}

function mapStateToProps(state) {
  return { posts: state.blogPost.posts };
}

export default connect(mapStateToProps, { loadPosts })(PostsList);
