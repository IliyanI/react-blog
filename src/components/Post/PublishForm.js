import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import notificationActions from "../../redux/actions/notificationActions";
import postActions from "../../redux/actions/postActions";
class PublishForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: { ...props.post.postData },
      redirect: false,
      mode: props.location.pathname.indexOf("edit") > -1 ? "edit" : "create"
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const form = this.state.form;
    form.content = encodeURI(form.content);

    const editForm = { ...form, postId: this.props.match.params.id };
    let createForm = {
      ...form,
      author: this.props.user.username,
      id: this.props.user._id
    };

    if (this.state.mode === "create") {
      this.props.postActions.createPost(createForm);
    } else {
      this.props.postActions.editPost(editForm);
    }

    this.props.postActions.flushPostData();
  };

  inputValidator = (name, value) => {};

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  };

  render() {
    // const editSuccess = this.props.post.edit
    //   ? this.props.post.edit.success
    //   : false;

    // const createSuccess = this.props.post.create
    //   ? this.props.post.edit.success
    //   : false;

    // if (editSuccess || createSuccess) {
    //   this.setState({ redirect: true });
    // }

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { form } = this.state;
    return (
      <div className="post-form">
        <form onChange={this.handleInput}>
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              name="title"
              placeholder="&nbsp;"
              value={form.title}
            />
            <span className="label">Title</span>
            <span className="border" />
          </label>
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              name="category"
              placeholder="&nbsp;"
              value={form.category}
            />
            <span className="label">Category</span>
            <span className="border" />
          </label>
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              name="description"
              placeholder="&nbsp;"
              value={form.description}
            />
            <span className="label">Description</span>
            <span className="border" />
          </label>
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              name="readTime"
              placeholder="&nbsp;"
              value={form.readTime}
            />
            <span className="label">Estimate read-time</span>
            <span className="border" />
          </label>
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              name="imageUrl"
              placeholder="&nbsp;"
              value={form.imageUrl}
            />
            <span className="label">Cover Image Url</span>
            <span className="border" />
          </label>

          <input
            className="make-post-button"
            type="button"
            value="Done"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.userData,
    post: state.posts
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
  )(PublishForm)
);
