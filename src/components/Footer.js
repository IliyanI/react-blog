import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Footer extends Component {
  render() {
    const divStyle = {};
    if (
      this.props.location.pathname === "/login" ||
      this.props.location.pathname === "/register"
    ) {
      divStyle.position = "absolute";
    } else {
      divStyle.position = "relative";
    }
    return (
      <div className="footer" style={divStyle}>
        <p className="icon">
          <span>B</span>logify
        </p>
        <p className="links">
          <a href="help">Help</a>
          <a href="terms">Terms of Service</a>
        </p>
      </div>
    );
  }
}

export default withRouter(Footer);
