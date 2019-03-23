/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Comment from "./Comment";
import "./Comments.css";
import serverEndpoints from "../../helpers/serverEndpoints";
import remote from "../../helpers/remote";
const COMMENT_CREATE = serverEndpoints.COMMENT_CREATE;
const POST_GET_COMMENTS = serverEndpoints.POST_GET_COMMENTS;

class CommentArea extends Component {
  state = {
    comments: this.props.comments,
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

    const data = {
      postId: this.props.postId,
      user: {
        username: sessionStorage.getItem("username"),
        id: sessionStorage.getItem("user_id")
      },
      content: this.state.commentContent
    };

    remote
      .post(COMMENT_CREATE, data)
      .then(data => {
        remote
          .get(POST_GET_COMMENTS + this.props.postId)
          .then(data => data.json())
          .then(data => this.setState({ comments: data }));
      })
      .catch(err => console.log(err));
  };
  render() {
    const { comments } = this.state;

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

export default CommentArea;
