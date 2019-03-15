import React, { Component } from "react";
import PostCard from "../Post/PostCard";
import { connect } from "react-redux";
import "../Post/Trending/Trending.css";
import Trending from "../Post/Trending/Trending.js";
import postActions from "../../redux/actions/postActions";
import "../Post/post.css";

class Feed extends Component {
  state = {
    displayedPosts: 5
  };

  componentDidMount() {
    setInterval(this.loadMoreImages, 500);

    const ddat = Date.now();
    console.log(new Date(ddat).getTime());
    this.props.getPosts();
  }

  loadMoreImages = () => {
    let test =
      document.querySelector("body").offsetHeight - 100 <=
      window.scrollY + window.innerHeight;

    if (test && !this.state.loading) {
      this.setState({
        loading: true,
        displayedPosts: this.state.displayedPosts + 5
      });
    }
  };

  sortPostsByDate = () => {
    this.props.sortPostsByDate();
  };

  sortPostsByLikes = () => {
    this.props.sortPostsByLikes();
  };

  render() {
    const { displayedPosts } = this.state;
    const { postsCount } = this.props.posts;

    return (
      <main className="posts-section">
        <h2 className="posts-header">Feed</h2>
        <div className="posts-wrapper">
          <div className="posts-sort">
            <h2>Sort posts by:</h2>
            <ul>
              <li>
                <a onClick={this.sortPostsByLikes}>Likes</a>
              </li>
              <li>
                <a onClick={this.sortPostsByDate}>Recent</a>
              </li>
            </ul>
          </div>
          <div className="posts-list">
            <div className="feed">
              {this.props.posts.allPosts ? (
                this.props.posts.allPosts.map((post, index) => {
                  if (index < displayedPosts && index < postsCount) {
                    if (index % 2 === 0) {
                      return <PostCard key={post._id} alt={true} {...post} />;
                    }
                    return <PostCard key={post._id} alt={false} {...post} />;
                  }
                })
              ) : (
                <div> No Posts Yet! </div>
              )}
            </div>
          </div>
        </div>
        {this.props.posts.allPosts && (
          <Trending allPosts={this.props.posts.allPosts} />
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return postActions(dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
