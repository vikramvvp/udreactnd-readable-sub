import React from 'react'
import { connect } from 'react-redux'
import { updateCommentVote, getComments, editComment, saveComment, deleteComment, commentReset } from '../actions'
import CommentsView from '../components/CommentsView';
import { withRouter } from 'react-router'

class ShowComments extends React.Component {
  componentDidMount() {
    this.props.onCommentsLoad(this.props.match.params.id);
  }

  render() {
    return ( 
      <CommentsView 
        comments={this.props.comments} 
        onUpdateVoteScore={this.props.onUpdateVoteScore} 
        onEditComment={this.props.onEditComment} 
        commentToEdit={this.props.commentToEdit} 
        onDeleteComment={this.props.onDeleteComment} 
        onSaveComment={this.props.onSaveComment} 
        onReset={this.props.onCommentReset}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.blog.comments,
    commentToEdit: state.blog.commentToEdit
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCommentsLoad: (postid) => {dispatch(getComments(postid))},
    onUpdateVoteScore: (direction, id) => {dispatch(updateCommentVote(direction, id))},
    onEditComment: (commentid) => {dispatch(editComment(commentid))},
    onSaveComment: (commentid) => {dispatch(editComment(commentid))}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowComments))

