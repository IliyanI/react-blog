import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";

const PrivateRoute = ({ WrappedComponent, ...props }) => {
  if (!props.user.authed) {
    props.isAuthed();
  }
  return (
    <Route
      render={wrappCopmProps =>
        props.user.authed ? (
          <WrappedComponent {...wrappCopmProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    path: ownProps.location,
    WrappedComponent: ownProps.component
  };
};

const mapDispatchToProps = dispatch => {
  return userActions(dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRoute)
);
