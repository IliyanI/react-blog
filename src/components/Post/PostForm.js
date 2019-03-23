import React, { Component, Fragment } from "react";
import remote from "../../helpers/remote";
import serverEndpoints from "../../helpers/serverEndpoints";
import Loading from "../Loading";
import TextEditor from "./TextEditing/TextEditor";
import "./PostForm.css";
import PublishForm from "./PublishForm.js";

class PostForm extends Component {
  state = {
    form: {},
    image: null,
    option: "",
    loading: false,
    content: "",
    mode: "create"
  };

  componentDidMount() {
    if (this.props.location.pathname.indexOf("edit") > -1) {
      this.setState({ postId: this.props.match.params.id });
      remote
        .get(serverEndpoints.POST_GET + this.props.match.params.id)
        .then(data => data.json())
        .then(data => {
          const form = {
            title: data.title,
            category: data.category,
            content: decodeURI(data.content),
            description: data.description,
            readTime: data.readTime,
            imageUrl: data.imageUrl
          };
          sessionStorage.setItem("content", form.content);
          this.setState({ form: { ...form }, mode: "edit" });
        });
    }
  }

  onPublish = content => {
    this.setState({ option: "publish", content: content });
  };

  render() {
    const { option, content, mode } = this.state;

    const form = this.state.form;

    return (
      <Fragment>
        {option === "publish" ? (
          <PublishForm content={content} form={form} mode={mode} />
        ) : (
          <div className="post-form">
            <TextEditor onPublish={this.onPublish} content={form.content} />
          </div>
        )}
        {this.state.loading ? <Loading /> : null}
      </Fragment>
    );
  }
}

export default PostForm;
