import React from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions'
import PostActions from '../components/PostActions';

class ShowPostActions extends React.Component {
  render() {
    return (
      (this.props.post ? 
      <PostActions 
        clickItems={this.props.clickItems}
        onDeletePost={this.props.onDeletePost}/>
      : <div></div>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.blog.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePost: (source, postid) => {dispatch(deletePost(source, postid))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPostActions)

