import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PostCard extends Component {
  handleClick = event => {
    this.props.setSelectedPost(this.props._id, this.props.posts);
  };
  render() {
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

    const date = new Date(this.props.dateCreated);
    const dateCreated = monthNames[date.getMonth()] + " " + date.getDate();

    const imageUrl = this.props.imageUrl;

    return (
      <div className={this.props.alt ? "blog-card alt" : "blog-card"}>
        <div className="meta">
          <div
            className="photo"
            style={{
              backgroundImage: "url(" + imageUrl + ")"
            }}
          />
          <ul className="details">
            <li className="author">
              <a href="#">{this.props.author}</a>
            </li>
            <li className="date">
              <p>
                {dateCreated} &#8226; {this.props.readTime} min read
              </p>
            </li>
          </ul>
        </div>
        <div className="description">
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <Link
            to={"/post/" + this.props._id}
            onClick={this.handleClick}
            className="post"
          >
            <p className="read-more">
              <span>Read More</span>
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.allPosts
  };
};

const mapDispatchToProps = dispatch => ({
  setSelectedPost: (id, posts) => {
    const payload = posts.filter(post => post._id === id)[0];
    dispatch({
      type: "SET_SELECTED_POST",
      payload: payload
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCard);
