import React, { Component, Fragment } from "react";
import remote from "../../helpers/remote";
import serverEndpoints from "../../helpers/serverEndpoints";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import notificationActions from "../../redux/actions/notificationActions";
import Loading from "../Loading";
import "./PostForm.css";

class PostForm extends Component {
  state = {
    redirect: false,
    form: {},
    image: null,
    option: "",
    loading: false
  };

  componentDidMount() {
    if (this.props.location.pathname.indexOf("edit") > -1) {
      this.setState({ loading: true });
      this.setState({ option: "edit" });
      this.setState({ postId: this.props.match.params.id });

      remote
        .get(serverEndpoints.POST_GET + this.props.match.params.id)
        .then(data => data.json())
        .then(data => {
          const form = {
            title: data.title,
            category: data.category,
            content: data.content,
            description: data.description,
            readTime: data.readTime
          };
          this.setState({ form: { ...form }, loading: false });
        });
    } else {
      this.setState({ option: "create" });
    }
  }

  inputValidator = (name, value) => {};

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    const file = name === "image" ? e.target.files[0] : false;

    if (name === "content") {
      e.target.style.height = e.target.scrollHeight + "px";
    }

    if (file) {
      const formData = new FormData();
      formData.append(name, file);

      this.setState({ image: formData });
    } else {
      let form = { ...this.state.form };
      form[name] = value;
      this.setState({ form: form });
    }
    //if (!this.inputValidator) {
    //  return;
    //check if image is correct type
    //}
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = this.state.form;
    this.setState({ loading: true });

    if (this.state.option === "create") {
      let post = {
        ...form,
        content: encodeURI(form.content),
        author: sessionStorage.getItem("username"),
        id: sessionStorage.getItem("user_id")
      };
      const image = this.state.image;

      remote
        .post(serverEndpoints.POST_CREATE, post, image)
        .then(data => {
          this.setState({ loading: false });
          this.setState({ redirect: true });
          this.props.notifySuccess("Post made successfuly!");
        })
        .catch(err => {
          console.log(err);
          this.props.notifyError("Something went wrong!");
        });
    } else {
      remote
        .post(serverEndpoints.POST_EDIT, { ...form, postId: this.state.postId })
        .then(data => {
          this.setState({ loading: false });
          this.setState({ redirect: true });
          this.props.notifySuccess("Post edited successfuly!");
        })
        .catch(err => {
          console.log(err);
          this.props.notifyError("Something went wrong!");
        });
    }
  };

  render() {
    const form = this.state.form;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="post-form">
          <form onChange={this.handleInput}>
            <label htmlFor="inp" class="inp">
              <input
                type="text"
                name="title"
                placeholder="&nbsp;"
                value={form.title}
              />
              <span class="label">Title</span>
              <span class="border" />
            </label>
            <label htmlFor="inp" class="inp">
              <input
                type="text"
                name="category"
                placeholder="&nbsp;"
                value={form.category}
              />
              <span class="label">Category</span>
              <span class="border" />
            </label>
            <label htmlFor="inp" class="inp">
              <input
                type="text"
                name="description"
                placeholder="&nbsp;"
                value={form.description}
              />
              <span class="label">Description</span>
              <span class="border" />
            </label>
            <label htmlFor="inp" class="inp">
              <input
                type="text"
                name="readTime"
                placeholder="&nbsp;"
                value={form.readTime}
              />
              <span class="label">Estimate read-time</span>
              <span class="border" />
            </label>
            <label htmlFor="inp" class="inp textarea">
              <textarea
                className="post-content"
                name="content"
                placeholder="&nbsp;"
                value={form.content}
              />
              <span class="label">Content</span>
              <span class="border" />
            </label>
            <input type="file" name="image" className="imageUpload" />
            <input
              className="make-post-button"
              type="button"
              value="Done"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
        {this.state.loading ? <Loading /> : null}
      </Fragment>
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
  )(PostForm)
);
