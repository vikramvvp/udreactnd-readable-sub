import React from 'react'
import { connect } from 'react-redux'
import { loadCategories, fetchPost, savePost } from '../actions'
import PostAddEdit from '../components/PostAddEdit';
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'

class ShowPostAddEdit extends React.Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.onPostLoad(this.props.match.params.id);
    }
    this.props.onLoadCategories();
  }

  render() {
    return ( 
      <PostAddEdit 
        post={(this.props.post) ? this.props.post : {}}  
        categories={this.props.categories}
        onSavePost={this.props.onSavePost} 
        onReset={this.props.onReset}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.blog.post,
    categories: state.blog.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostLoad: postid => {dispatch(fetchPost(postid))},
    onLoadCategories: () => {dispatch(loadCategories())},
    onSavePost: (saveType, post) => {dispatch(savePost(saveType, post))},
    onReset: (postid) => {
      if (postid === "") {
        dispatch(push('/'))
      }
      else {
        dispatch(push(`/posts/${postid}`))
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPostAddEdit))

