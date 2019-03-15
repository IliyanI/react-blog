import React, { Component } from "react";
import "./components/Navigation/Navigation.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer";
import Feed from "./components/Feed/Feed";
import "./components/Feed/Feed.css";
import PostForm from "./components/Post/PostForm";
import Register from "./components/user-components/Register";
import Login from "./components/user-components/Login";
import NotFound from "./components/NotFound";
import PostScreen from "./components/Post/PostScreen";
import ProfilePage from "./components/user-components/ProfilePage";
import Notification from "./components/notification/Notification.js";
import About from "./components/About/About";
import "./components/About/About.css";

class App extends Component {
  render() {
    console.log(
      this.props.location.pathname === "/" &&
        !sessionStorage.getItem("user_token")
    );
    return (
      <React.Fragment>
        <header>
          <div className="container">
            <div className="header-content">
              <h1>-Do Work That Matters-</h1>
              <h3>You'll never regret it.</h3>
            </div>
          </div>
        </header>

        <Navigation />

        {this.props.notification.message ? (
          <Notification {...this.props.notification} />
        ) : null}
        {this.props.location.pathname === "/" &&
        !sessionStorage.getItem("user_token") ? (
          <About />
        ) : null}

        <div className="container">
          <Switch>
            <Route path="/post/edit/:id" component={PostForm} />
            <Route path="/user/profile" component={ProfilePage} />
            <Route path="/post/create" component={PostForm} />
            <Route
              path="/post/:id"
              render={() => <PostScreen {...this.props.posts.selectedPost} />}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Feed} />
            <Route component={NotFound} />
          </Switch>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    notification: state.notification
  };
};

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
