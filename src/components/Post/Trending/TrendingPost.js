import React, { Component } from "react";
import { Link } from "react-router-dom";

class TrendingPost extends Component {
  render() {
    return (
      <Link to={"/post/" + this.props._id}>
        <div className="trending-post">
          <p className="trending-index">{this.props.index + 1}.</p>
          <div className="trending-post-content">
            <h2 className="trending-title">{this.props.title}</h2>
            <p className="trending-description">{this.props.description}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default TrendingPost;
