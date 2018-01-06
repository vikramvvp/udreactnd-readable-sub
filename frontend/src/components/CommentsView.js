import React,{ Component } from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import CommentForm from './CommentForm'

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
};

class CommentsView extends Component {
  state = {
    commentModalOpen: false,
    comment: {}
  }

  // to solve appElement warning https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  openCommentModal = comment => {
    this.setState({
      commentModalOpen: true,
      comment
    })
  }

  closeCommentModal = () => {
    this.setState({
      commentModalOpen: false,
      comment: null
    })
  }

  render(){
   let { comments, onUpdateVoteScore, onDeleteComment, onSaveComment } = this.props;
   let {commentModalOpen} = this.state;
  return (
    <div>
      <p className="text-right"><a className="btn btn-secondary btn-sm" href="" role="button"
        onClick={(e) => { e.preventDefault(); this.openCommentModal() }}>
      Add New Comment</a></p>
      <div className="card">
        <h5 className="card-header">Comments:</h5>
        <div className="card-body">
          {!comments ? <span>Be the first to comment!</span> : _.map(comments, comment => {
            const { id, timestamp, body, voteScore, author } = comment;
            return (
              <div className="card mb-4" key={id}>
                <div className="card-body">
                  <h6 className="card-title">By: {author}</h6>
                  <h6 className="card-subtitle text-muted"><p>
                    Posted on {(new Date(timestamp)).toUTCString()}
                    &nbsp;&nbsp;&#124;&nbsp;&nbsp;
                    <a className="btn btn-outline-secondary" href="" role="button"
                            onClick={(e) => { e.preventDefault(); onUpdateVoteScore('upVote', id) }}>
                            <FaThumbsOUp size={15} />
                          </a>&nbsp;&nbsp;
                    <span>{voteScore}</span>&nbsp;&nbsp;
                    <a className="btn btn-outline-secondary" href="" role="button"
                      onClick={(e) => { e.preventDefault(); onUpdateVoteScore('downVote', id) }}>
                      <FaThumbsODown size={15} />
                    </a>
                  </p></h6>
                  <p>{body}</p>
                </div>
                <div className="card-footer text-muted">
                  <div className="btn-group">
                    <a className="btn btn-secondary btn-sm" href="" role="button"
                      onClick={(e) => { e.preventDefault(); this.openCommentModal(comment) }}>
                      Edit</a>
                    <a className="btn btn-secondary btn-sm" href="" role="button"
                      onClick={(e) => { e.preventDefault(); onDeleteComment(id) }}>
                      Delete</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Modal
        style={customStyles}
        isOpen={this.state.commentModalOpen}
        onRequestClose={this.closeCommentModal}
        contentLabel='Modal'
      >
      {commentModalOpen && <CommentForm comment={this.state.comment} onSubmit={onSaveComment} onReset={this.closeCommentModal} />}
      </Modal>
    </div>
  )
  }
}

export default CommentsView