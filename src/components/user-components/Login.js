import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import notificationActions from "../../redux/actions/notificationActions";
import userActions from "../../redux/actions/userActions";
import "./Login.css";

class Login extends Component {
  state = {
    redirect: false,
    form: {}
  };

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  };

  componentDidUpdate() {
    const userData = this.props.user.userData;
    const token = this.props.user.token;

    if (userData) {
      sessionStorage.setItem("token", token);
      this.setState({ redirect: true });
    }
  }

  handleLogin = event => {
    event.preventDefault();

    this.props.userActions.loginUser(this.state.form);
    //add notifications
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <h1>Login</h1>
        <form onChange={this.handleInput}>
          <label htmlFor="inp" className="inp">
            <input type="text" name="email" placeholder="&nbsp;" />
            <span className="label">Email</span>
            <span className="border" />
          </label>
          <label htmlFor="inp" className="inp">
            <input type="password" name="password" placeholder="&nbsp;" />
            <span className="label">Password</span>
            <span className="border" />
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    notifActions: notificationActions(dispatch),
    userActions: userActions(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
