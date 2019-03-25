//dependencies
import React, { Component, Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//other components
import CommentArea from "../user-components/CommentArea";
import Loading from "../Loading";

//redux
import notificationActions from "../../redux/actions/notificationActions";
import postActions from "../../redux/actions/postActions";

//styles
import "./PostScreen.css";

class PostScreen extends Component {
  state = {
    redirect: false,
    route: "",
    loading: false,
    post: {},
    test: ""
  };

  componentDidMount() {
    this.props.postActions.getPost(this.props.match.params.id);
  }

  handleLike = e => {
    e.preventDefault();

    this.props.postActions.likePost(this.props.post._id);
  };

  handleDelete = () => {
    this.props.postActions.deletePost(this.props.post._id);
  };

  handleEdit = () => {
    this.setState({
      redirect: true,
      route: "/post/edit/" + this.props.post._id
    });
  };

  isAuthedToEditDelete = () => {
    const username = this.props.user.userData
      ? this.props.user.userData.username
      : "";
    const admin =
      this.props.user.userData &&
      this.props.user.userData.roles.indexOf("Admin") > -1;
    if (username === this.state.post.author || admin) return true;
    return false;
  };

  handleComment = () => {
    this.setState({ redirect: true, route: this.props.location.path });
  };

  render() {
    if (!this.props.post) {
      return <div>Post loading.</div>;
    }

    const {
      title,
      description,
      author,
      content,
      readTime,
      likes,
      _id,
      comments,
      dateCreated
    } = this.props.post;

    console.log(this.props.post);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const date = new Date(dateCreated);
    const dateDisplay = monthNames[date.getMonth()] + " " + date.getDate();

    if (this.state.redirect) {
      return <Redirect to={this.state.route} />;
    }

    return (
      <React.Fragment>
        {this.state.loading && <Loading />}
        <div className="post-screen">
          <h1>{title}</h1>
          <h3>{description}</h3>
          {this.isAuthedToEditDelete() ? (
            <Fragment>
              <button className="edit-post" onClick={this.handleEdit}>
                Edit
              </button>
              <button className="delete-post" onClick={this.handleDelete}>
                Delete
              </button>
            </Fragment>
          ) : null}

          <p className="author">
            Written by{" "}
            <i>
              <b>{author}</b>
            </i>
          </p>

          <p className="read-time">
            {dateDisplay} &#8226; {readTime} min read.
          </p>

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="like-button">
            {/* this need to be a button */}
            <a href="#" onClick={this.handleLike}>
              &#x1f44d; {likes} likes.
            </a>
          </div>
        </div>
        {title && <CommentArea comments={comments} postId={_id} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.postData,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notificationActions: notificationActions(dispatch),
    postActions: postActions(dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostScreen)
);
