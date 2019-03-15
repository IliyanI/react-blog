import React, { Component } from "react";
import remote from "../../helpers/remote";
const LIKE_COMMENT_ENDPOINT = "http://localhost:5000/comment/like/";

class Comment extends Component {
  handleLike = e => {
    e.preventDefault();
    // query selector for likes element
    // document
    // .querySelector('#root > div.container > div.comment-section > div.comments > div > div > p').value()
    remote.post(LIKE_COMMENT_ENDPOINT + this.props._id);
  };
  render() {
    return (
      <div className="comment-wrapper">
        <div className="comment">
          <p className="author">{this.props.author}</p>
          <p className="content">{this.props.content}</p>
          <div className="likes">
            <a href="#" onClick={this.handleLike}>
              &#x1f44d;
            </a>
            <p>{this.props.likes} likes.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
