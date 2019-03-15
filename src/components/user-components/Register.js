import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import remote from "../../helpers/remote";
import { connect } from "react-redux";
import "./Register.css";

import notificationActions from "../../redux/actions/notificationActions";
const REGISTER_ENDPOINT = "http://localhost:5000/auth/signup";

class Register extends Component {
  state = {
    redirect: false
  };
  handleRegister = event => {
    event.preventDefault();
    const form = event.target.form;
    let user = {
      username: form[0].value,
      email: form[1].value,
      password: form[2].value,
      repeatPassword: form[3].value
    };

    remote
      .post(REGISTER_ENDPOINT, user)
      .then(data => this.props.notifySuccess("Signed up successfuly!"))
      .catch(err => {
        this.props.notifyError("Sign up failed try again.");
        console.log(err);
      });
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register">
        <h1>Register</h1>
        <form>
          <label for="inp" class="inp">
            <input type="text" name="username" placeholder="&nbsp;" />
            <span class="label">Username</span>
            <span class="border" />
          </label>
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
          <label for="inp" class="inp">
            <input type="text" name="repeat-password" placeholder="&nbsp;" />
            <span class="label">Repeat password</span>
            <span class="border" />
          </label>

          {/* <input type="text" name="username" placeholder="&nbsp;" />

          <p>Email:</p>

          <input type="text" name="email" placeholder="Your email" />
          <p>Password:</p>

          <input type="text" name="password" placeholder="Your password" />
          <p>Repeat password:</p>

          <input
            type="text"
            name="repeat-password"
            placeholder="Repeat password"
          /> */}
          <input
            className="submit-button"
            type="button"
            value="Register"
            onClick={this.handleRegister}
          />
        </form>
        <p>
          Already have and account <Link to="/login">sign in.</Link>
        </p>
      </div>
    );
  }
}

/* if you need to add redux state
const mapStateToProps = state => {
  return {
    ...
  };
};
*/

const mapDispatchToProps = dispatch => {
  return notificationActions(dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
