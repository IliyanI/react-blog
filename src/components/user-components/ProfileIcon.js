import React, { Component } from "react";

class ProfileIcon extends Component {
  render() {
    return <div id="user-icon">{sessionStorage.getItem("username")}</div>;
  }
}

export default ProfileIcon;
