import React from 'react'
import { connect } from 'react-redux'
import { updateVote, fetchComments } from '../actions'
import CommentsView from '../components/CommentsView';
import { withRouter } from 'react-router'

class ShowComments extends React.Component {
  componentDidMount() {
    this.props.onCommentsLoad(this.props.match.params.id);
  }

  render() {
    return ( 
      <CommentsView comments={this.props.comments} onUpdateVoteScore={this.props.onUpdateVoteScore} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.blog.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCommentsLoad: (postid) => {dispatch(fetchComments(postid))},
    onUpdateVoteScore: (direction, id) => {dispatch(updateVote(direction, id))}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowComments))

