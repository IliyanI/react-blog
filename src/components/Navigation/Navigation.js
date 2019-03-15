import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../user-components/ProfileIcon";

class Navigation extends Component {
  handleLogout = () => {
    sessionStorage.clear();
  };
  render() {
    return (
      <div className="nav-wrapper">
        <nav id="navigation">
          <ul>
            <li>
              <Link to="/">Feed</Link>
            </li>

            {!(
              sessionStorage.getItem("username") &&
              sessionStorage.getItem("user_token")
            ) ? (
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
                    {sessionStorage.getItem("username")}
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

export default Navigation;
