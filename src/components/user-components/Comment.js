import React, { Component } from "react";
import remote from "../../helpers/remote";
const LIKE_COMMENT_ENDPOINT = "http://localhost:5000/comment/like/";

class Comment extends Component {
  state = {
    comment: this.props
  };

  handleLike = e => {
    e.preventDefault();

    const likes = this.state.comment.likes + 1;
    this.setState({ comment: { ...this.state.comment, likes: likes } });
    remote.post(LIKE_COMMENT_ENDPOINT + this.props._id);
  };
  render() {
    const { author, content, likes } = this.state.comment;
    return (
      <div className="comment-wrapper">
        <div className="comment">
          <p className="author">{author}</p>
          <p className="content">{content}</p>
          <div className="likes">
            <a href="#" onClick={this.handleLike}>
              &#x1f44d;
            </a>
            <p>{likes} likes.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
