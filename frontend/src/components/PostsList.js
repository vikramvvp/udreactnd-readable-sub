import _ from 'lodash';
import React, { Component } from 'react'
import { loadPosts } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DarkThumbsUp from 'react-icons/lib/fa/thumbs-up';
import DarkComments from 'react-icons/lib/fa/comments';

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
            <Link to={`/post?id=${post.id}/`}><h2 className="card-title">{post.title}</h2></Link>
            <p className="card-text">{post.body.substr(0, 150) + '...'}</p>
          </div>
          <div className="card-footer text-muted">
            Posted on January 1, 2017 by {post.author}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<DarkComments b size={20} /> {post.commentCount}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<DarkThumbsUp size={20}/> {post.voteScore}
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
