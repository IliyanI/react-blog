import React, { Component } from "react";
import "./Notification.css";

class Notification extends Component {
  handleClick = e => {
    e.target.classList.add("disappear");
  };

  render() {
    return (
      <div className="notification" onClick={this.handleClick}>
        <input type="checkbox" id="one" class="hidden" name="ossm" />
        <label for="one" class={"alert-message " + this.props.class}>
          {this.props.message}
        </label>
      </div>
    );
  }
}

export default Notification;
