import _ from 'lodash';
import React from 'react'
import { connect } from 'react-redux'
import { loadPosts, selectSortCriteria, updatePostVote, deletePost } from '../actions'
import PostsList from '../components/PostsList'

class VisiblePostsList extends React.Component {
  componentDidMount() {
    this.props.onLoad(this.props.category);
  }

  render() {
    return ( 
      <PostsList 
        posts={this.props.posts} 
        category={this.props.category} 
        onSortCriteriaChange={this.props.onSortCriteriaChange} 
        onUpdateVoteScore={this.props.onUpdateVoteScore} 
        onDeletePost={this.props.onDeletePost}
      />
    )
  }
}

const getVisiblePosts = (posts, sortCriteria) => {
  if (posts && posts.length > 0) {
    return _.orderBy(posts, [sortCriteria.sortField], [sortCriteria.sortOrder]);
  }
  else {
    return [];
  }
}

const mapStateToProps = (state) => {
  return {
    category:state.blog.category,
    sortCriteria:state.blog.sortCriteria,
    posts: getVisiblePosts(state.blog.posts, state.blog.sortCriteria)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: category => {dispatch(loadPosts(category))},
    onSortCriteriaChange: criteria => {dispatch(selectSortCriteria(criteria))},
    onUpdateVoteScore: (source,direction,id) => {dispatch(updatePostVote(source,direction,id))},
    onDeletePost: (source, postid) => {dispatch(deletePost(source, postid))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisiblePostsList)