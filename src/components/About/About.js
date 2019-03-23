import React, { Component } from "react";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="about">
        <div className="content">
          <h2>About</h2>
          <div className="about-text">
            Blogify is a React project inpired by{" "}
            <a href="www.medium.com">Medium.com</a>. You can see the source code
            at my <a href="https://github.com/IliyanI/react-blog">Github</a>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
