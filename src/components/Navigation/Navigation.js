import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../user-components/ProfileIcon";
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";

class Navigation extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const user = this.props.user;
    return (
      <div className="nav-wrapper">
        <nav id="navigation">
          <ul>
            <li>
              <Link to="/">Feed</Link>
            </li>
            {!user.authed ? (
              <Fragment>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to="/post/create">Make a Post</Link>
                </li>
                <li>
                  <Link to="/" onClick={this.handleLogout}>
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to="/user/profile" onClick={this.handleCllick}>
                    {user.userData.username}
                  </Link>
                </li>
              </Fragment>
            )}

            <li className="github-nav">
              <a href="https://github.com/IliyanI">Github</a>
            </li>
          </ul>
        </nav>
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
  return userActions(dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
