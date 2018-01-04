import React from 'react'
import { connect } from 'react-redux'
import { updateVote, fetchPost } from '../actions'
import Post from '../components/Post';
import { withRouter } from 'react-router'

class ShowPost extends React.Component {
  componentDidMount() {
    this.props.onPostLoad(this.props.match.params.id);
  }

  render() {
    return ( 
      <Post post={this.props.post} onUpdateVoteScore={this.props.onUpdateVoteScore} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.blog.post
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPostLoad: (postid) => {dispatch(fetchPost(postid))},
    onUpdateVoteScore: (direction) => {dispatch(updateVote(direction))}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPost))

