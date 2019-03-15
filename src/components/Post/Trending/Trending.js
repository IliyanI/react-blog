import React, { Component } from "react";
import TrendingPost from "./TrendingPost";

class Trending extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    //TODO make it so take posts created no more than 10 days ago
    let trendingPosts = this.props.allPosts;
    trendingPosts = trendingPosts
      .sort((a, b) => b.likes - a.likes)
      .filter((post, index) => index < 3);
    this.setState({ posts: trendingPosts });
  }
  render() {
    let posts = this.state.posts;

    return (
      <div className="trending">
        <div className="trending-container">
          <p className="trending-header">Trending</p>
          <div className="trending-posts">
            {posts.length > 0 &&
              posts.map((post, index) => (
                <TrendingPost key={post._id} {...post} index={index} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Trending;
