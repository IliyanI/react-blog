import React, { Component } from "react";
import remote from "../../helpers/remote";
import serverEndpoints from "../../helpers/serverEndpoints";
import notificationActions from "../../redux/actions/notificationActions";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { POST_CREATE, POST_EDIT } = serverEndpoints;

class PublishForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: props.form,
      redirect: false,
      mode: props.mode
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const form = this.state.form;
    form.content = encodeURI(this.props.content);

    if (this.state.mode === "create") {
      let post = {
        ...form,
        author: sessionStorage.getItem("username"),
        id: sessionStorage.getItem("user_id")
      };

      const image = this.state.image;

      remote
        .post(POST_CREATE, post, image)
        .then(data => {
          this.setState({ redirect: true });
          this.props.notifySuccess("Post made successfuly!");
          sessionStorage.removeItem("content");
        })
        .catch(err => {
          console.log(err);
          this.props.notifyError("Something went wrong!");
        });
    } else {
      remote
        .post(POST_EDIT, { ...form, postId: this.props.match.params.id })
        .then(data => data.json())
        .then(data => {
          if (data.success) {
            this.setState({ redirect: true });
            this.props.notifySuccess("Post edited successfuly!");
          } else {
            this.props.notifyError(data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.props.notifyError("Something went wrong!");
        });
    }
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

const mapDispatchToProps = dispatch => {
  return notificationActions(dispatch);
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(PublishForm)
);
