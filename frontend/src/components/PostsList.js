import _ from 'lodash';
import React, { Component } from 'react'
import { loadPosts, sortPosts } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DarkThumbsUp from 'react-icons/lib/fa/thumbs-up';
import DarkComments from 'react-icons/lib/fa/comments';

class PostsList extends Component {
  state ={
    posts: [],
    category: 'all',
    sortField: ''
  }

  componentDidMount() {
    this.props.loadPosts(this.props.category);
    this.setState({posts: this.props.posts});
  }

  // sortPosts(sortField) {
  //   // console.log('this.state',this.state);
  //   this.setState(_.sortBy(this.state.posts, sortField))
  // }

  render() {
    // console.log('this.props',this.props);
    // console.log('this.state',this.state);
    return (
      <div className="col-md-8">
        <h1 className="my-4">Posts List <small>- {this.props.category}</small></h1>
        <div className="dropdown text-right">
        Sort By: <select 
          onChange={event => {
            this.props.sortPosts(event.target.value.split('|')[0], event.target.value.split('|')[1]);
          }}>
          <option value="title|asc">Title - ascending</option>
          <option value="title|desc">Title - descending</option>
          <option value="voteScore|asc">Vote Score - ascending</option>
          <option value="voteScore|desc">Vote Score - descending</option>
          <option value="timestamp|asc">Date Time - ascending</option>
          <option value="timestamp|desc">Date Time - descending</option>
        </select>
        </div>
        {_.map(this.props.posts, post => (
        <div className="card mb-4" key={post.id}>
          <div className="card-body">
            <Link to={`/post?id=${post.id}/`}><h2 className="card-title">{post.title}</h2></Link>
            <p className="card-text">{post.body.substr(0, 150) + '...'}</p>
          </div>
          <div className="card-footer text-muted">
            Posted on {(new Date(post.timestamp)).toUTCString()} by {post.author}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<i title="Comments"><DarkComments size={20} /></i> {post.commentCount}&nbsp;&nbsp;&#124;&nbsp;&nbsp;<i title="Vote Score"><DarkThumbsUp size={20}/></i> {post.voteScore}
          </div>
        </div>
      ))}
      </div>
  )}
}

function mapStateToProps(state) {
  return { category: state.blog.category, posts: state.blog.posts };
}

export default connect(mapStateToProps, { loadPosts, sortPosts })(PostsList);
