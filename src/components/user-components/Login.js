import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import remote from "../../helpers/remote";
import { connect } from "react-redux";
import notificationActions from "../../redux/actions/notificationActions";
import "./Login.css";

const LOGIN_ENDPOINT = "http://localhost:5000/auth/login";

class Login extends Component {
  state = {
    redirect: false
  };
  handleLogin = event => {
    event.preventDefault();
    const form = event.target.form;
    let user = {
      email: form[0].value,
      password: form[1].value
    };

    remote
      .post(LOGIN_ENDPOINT, user)
      .then(data => data.json())
      .then(res => {
        sessionStorage.setItem("user_token", res.token);
        sessionStorage.setItem("username", res.user.username);
        sessionStorage.setItem("user_id", res.user.id);
        if (res.user.roles.indexOf("Admin") > -1) {
          sessionStorage.setItem("user_role", "Admin");
        }
        this.props.notifySuccess("Signed in successfuly!");
        this.setState({ redirect: true });
        console.log("User data sent!");
      })
      .catch(err => {
        console.log(err);
        this.props.notifyError("Something went wrong!");
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <h1>Login</h1>
        <form>
          <label for="inp" class="inp">
            <input type="text" name="email" placeholder="&nbsp;" />
            <span class="label">Email</span>
            <span class="border" />
          </label>
          <label for="inp" class="inp">
            <input type="text" name="password" placeholder="&nbsp;" />
            <span class="label">Password</span>
            <span class="border" />
          </label>

          <input
            className="login-button"
            type="button"
            value="Login"
            onClick={this.handleLogin}
          />
        </form>
        <p>
          Dont have an account <Link to="/register">sign up.</Link>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return notificationActions(dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
