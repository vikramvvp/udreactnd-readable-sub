import React from 'react'
import { connect } from 'react-redux'
import { updateCommentVote, getComments, saveComment, deleteComment } from '../actions'
import CommentsView from '../components/CommentsView';
import { withRouter } from 'react-router'

class ShowComments extends React.Component {
  componentDidMount() {
    this.props.onCommentsLoad(this.props.match.params.id);
  }

  render() {
    return ( 
      (this.props.post ? 
      <CommentsView 
        comments={this.props.comments} 
        onUpdateVoteScore={this.props.onUpdateVoteScore} 
        onDeleteComment={this.props.onDeleteComment} 
        onSaveComment={this.props.onSaveComment} 
      />
      : <div></div>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.blog.post,
    comments: state.blog.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCommentsLoad: (postid) => {dispatch(getComments(postid))},
    onUpdateVoteScore: (direction, id) => {dispatch(updateCommentVote(direction, id))},
    onSaveComment: (saveType,comment) => {dispatch(saveComment(saveType, comment, ownProps.match.params.id))},
    onDeleteComment: (commentid) => {dispatch(deleteComment(commentid))},
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowComments))

