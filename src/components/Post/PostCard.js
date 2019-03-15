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

    return (
      // "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"
      // <Link to={"/post/" + this.props._id} onClick={this.handleClick}>
      //   <div className="post-preview">
      //     <p className="title">{this.props.title}</p>
      //     <p className="author">Author {this.props.author}</p>
      //     <span className="type">Type {this.props.type}</span>
      //     <span className="read-time">
      //       Estimate read time: {this.props.readTime} min
      //     </span>
      //   </div>
      // </Link>
      <div className={this.props.alt ? "blog-card alt" : "blog-card"}>
        <div className="meta">
          <div
            className="photo"
            style={{
              backgroundImage: "url(" + "https://i.imgur.com/99j3fq5.gif" + ")"
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
            {/* <li className="tags">
              <ul>
                <li>
                  <a href="#">{this.props.type}</a>
                </li>
                <li>
                  <a href="#">Code</a>
                </li>
                <li>
                  <a href="#">HTML</a>
                </li>
                <li>
                  <a href="#">CSS</a>
                </li>
              </ul>
            </li> */}
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
