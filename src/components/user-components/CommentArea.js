/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import postActions from "../../redux/actions/postActions";

import Comment from "./Comment";
import "./Comments.css";

class CommentArea extends Component {
  state = {
    //comments: this.props.comments,
    commentContent: ""
  };

  handleTextArea = e => {
    e.target.style.height = e.target.scrollHeight + "px";
    const value = e.target.value;

    this.setState({ commentContent: value });
  };

  handleComment = e => {
    e.preventDefault();

    e.target.previousSibling.previousSibling.style.height = "48px";
    e.target.previousSibling.previousSibling.children[0].value = "";

    if (this.props.user) {
      const commentForm = {
        postId: this.props.postId,
        user: {
          username: this.props.user.username,
          id: this.props.user.id
        },
        content: this.state.commentContent
      };
      this.props.createComment(commentForm);
    }
  };
  render() {
    const { comments } = this.props.post;

    return (
      <div className="comment-section-wrapper">
        <div className="background" />
        <div className="comment-section">
          <div className="comment-form">
            <h3>Comments</h3>
            <div className="comment-textarea">
              <textarea
                name="content"
                className="comment-textarea-content"
                onChange={this.handleTextArea}
              />
              <span class="label">Leave a respone here</span>
              <span class="border" />
            </div>
            <div className="break" />
            <a href="#" onClick={this.handleComment}>
              Submit
            </a>
          </div>
          <div className="comments">
            {comments && comments.map(comment => <Comment {...comment} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.userData,
    post: state.posts.postData
  };
};

const mapDispatchToProps = dispatch => {
  return postActions(dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentArea);
