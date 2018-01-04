import _ from 'lodash';
import React from 'react'
import { connect } from 'react-redux'
import { loadPosts, selectSortCriteria } from '../actions'
import PostsList from '../components/PostsList'

class VisiblePostsList extends React.Component {
  componentDidMount() {
    this.props.onLoad(this.props.category);
  }

  render() {
    return ( 
      <PostsList posts={this.props.posts} onSortCriteriaChange={this.props.onSortCriteriaChange} />
    )
  }
}

const getVisiblePosts = (posts, category, sortCriteria) => {
  if (posts && posts.length > 0) {
    return _.orderBy(_.filter(posts, p=>(category==='all'? true : p.category===category)), [sortCriteria.sortField], [sortCriteria.sortOrder]);
  }
  else {
    return [];
  }
}

const mapStateToProps = (state) => {
  return {
    category:state.blog.category,
    sortCriteria:state.blog.sortCriteria,
    posts: getVisiblePosts(state.blog.posts, state.blog.category, state.blog.sortCriteria)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: category => {dispatch(loadPosts(category))},
    onSortCriteriaChange: criteria => {dispatch(selectSortCriteria(criteria))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisiblePostsList)
// const VisiblePostsList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PostsList)

//export default VisiblePostsList
