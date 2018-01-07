import React from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions'
import PostActions from '../components/PostActions';

class ShowPostActions extends React.Component {
  render() {
    return ( 
      <PostActions 
        clickItems={this.props.clickItems}
        onDeletePost={this.props.onDeletePost}/>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePost: (postid) => {dispatch(deletePost(postid))}
  }
}

export default connect(null, mapDispatchToProps)(ShowPostActions)

