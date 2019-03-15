/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Comment from "./Comment";
import "./Comments.css";
const COMMENT_CREATE_ENDPOINT = "http://localhost:5000/comment/create";

class CommentArea extends Component {
  handleTextArea = e => {
    e.target.style.height = e.target.scrollHeight + "px";
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
      content: e.target.previousSibling.value
    };
    fetch(COMMENT_CREATE_ENDPOINT, {
      method: "post",
      headers: {
        authorization: "bearer " + sessionStorage.getItem("user_token"),
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };
  render() {
    return (
      <div className="comment-section-wrapper">
        <div className="background" />
        <div className="comment-section">
          <div className="comment-form">
            <h3>Comments</h3>
            <div className="comment-textarea">
              <textarea
                name="comment-textarea-content"
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
            {this.props.comments &&
              this.props.comments.map(comment => <Comment {...comment} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentArea;
