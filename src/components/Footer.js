import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p className="icon">Blogify</p>
        <p className="links">
          <a href="help">Help</a>
          <a href="terms">Terms of Service</a>
        </p>
      </div>
    );
  }
}
