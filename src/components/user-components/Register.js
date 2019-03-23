import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Register.css";

import notificationActions from "../../redux/actions/notificationActions";
import userActions from "../../redux/actions/userActions";

class Register extends Component {
  state = {
    redirect: false,
    form: {},
    validInput: null,
    errorMessage: {}
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateInput = (name, value) => {
    const { username, email, password, repeatPassword } = this.state.form;
    const { errorMessage } = this.state;

    if (name === "username") {
      if (value.length >= 6) {
        this.setState({ errorMessage: { ...errorMessage, username: "" } });
      } else {
        this.setState({
          errorMessage: {
            ...errorMessage,
            username: "Username must be atleast 6 charecters long."
          }
        });
      }
    }
    if (name === "email") {
      if (this.validateEmail(value)) {
        this.setState({ errorMessage: { ...errorMessage, email: "" } });
      } else {
        this.setState({
          errorMessage: {
            ...errorMessage,
            email: "Invalid email."
          }
        });
      }
    }
    if (name === "password") {
      if (value.length >= 6) {
        this.setState({ errorMessage: { ...errorMessage, password: "" } });
        if (repeatPassword === value) {
          this.setState({
            errorMessage: { ...errorMessage, repeatPassword: "" }
          });
        }
      } else {
        this.setState({
          errorMessage: {
            ...errorMessage,
            password: "Password must be atleast 6 charecters long."
          }
        });
      }
    }
    if (name === "repeatPassword") {
      if (password && value === password) {
        this.setState({
          errorMessage: { ...errorMessage, repeatPassword: "" }
        });
      } else {
        this.setState({
          errorMessage: {
            ...errorMessage,
            repeatPassword: "Passwords must match."
          }
        });
      }
    }
  };

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
    this.validateInput(name, value);
  };

  validInput = () => {
    if (Object.values(this.state.errorMessage).join("").length === 0) {
      return true;
    } else {
      return false;
    }
  };

  componentDidUpdate() {
    const register = this.props.user.register;

    if (register.success) {
      this.setState({ redirect: true });
    }
  }

  handleRegister = event => {
    event.preventDefault();
    const userData = this.state.form;

    this.props.userActions.registerUser(userData);
  };

  render() {
    const errorMessage = Object.values(this.state.errorMessage);
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register">
        <h1>Register</h1>
        <div className="register-errors">
          {errorMessage.map(err => (
            <p>{err}</p>
          ))}
        </div>
        <form onChange={this.handleInput}>
          <label forname="inp error" className="inp">
            <input
              type="text"
              name="username"
              placeholder="&nbsp;"
              className="error"
            />
            <span className="label">Username</span>
            <span className="border" />
          </label>

          <label forname="inp" className="inp">
            <input type="text" name="email" placeholder="&nbsp;" />
            <span className="label">Email</span>
            <span className="border" />
          </label>

          <label forname="inp" className="inp">
            <input type="password" name="password" placeholder="&nbsp;" />
            <span className="label">Password</span>
            <span className="border" />
          </label>

          <label forname="inp" className="inp">
            <input type="password" name="repeatPassword" placeholder="&nbsp;" />
            <span className="label">Repeat password</span>
            <span className="border" />
          </label>

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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notificationActions: notificationActions(dispatch),
    userActions: userActions(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
