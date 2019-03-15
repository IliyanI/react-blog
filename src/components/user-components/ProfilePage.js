import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import postAactions from "../../redux/actions/postActions";
import PostCard from "../Post/PostCard";
import "./ProfilePage.css";

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getUserPosts(sessionStorage.getItem("user_id"));
  }
  render() {
    const myPosts = this.props.myPosts;
    console.log(this.props.myPosts);
    return (
      <Fragment>
        <div className="profile-posts">My Posts</div>
        {myPosts ? (
          myPosts.map((post, index) => {
            if (index % 2 === 0) {
              return <PostCard key={post._id} alt={true} {...post} />;
            }
            return <PostCard key={post._id} alt={false} {...post} />;
          })
        ) : (
          <div> No Posts Yet! </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    myPosts: state.posts.userPosts
  };
};

const mapDispatchToProps = dispatch => {
  return postAactions(dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilePage)
);
