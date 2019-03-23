import remote from "../../helpers/remote";
import serverEndpoints from "../../helpers/serverEndpoints";
const { USER_IS_AUTHED, USER_LOGIN, USER_REGISTER } = serverEndpoints;

export default dispatch => {
  return {
    isAuthed: () => {
      dispatch({
        type: "IS_AUTHED",
        payload: new Promise((res, rej) => {
          remote
            .post(USER_IS_AUTHED)
            .then(data => {
              if (data.status === 401) {
                return { authed: false };
              } else {
                return data.json();
              }
            })
            .then(data => res(data))
            .catch(err => rej(err));
        })
      });
    },
    loginUser: userData => {
      dispatch({
        type: "USER_LOGIN",
        payload: new Promise((res, rej) => {
          remote
            .post(USER_LOGIN, userData)
            .then(data => data.json())
            .then(data => {
              if (data.success) {
                if (data.user.roles.indexOf("Admin") > -1) {
                  return {
                    authed: true,
                    userData: data.user,
                    token: data.token
                  };
                } else {
                  return {
                    authed: true,
                    userData: data.user,
                    token: data.token
                  };
                }
              } else {
                return { authed: false };
              }
            })
            .then(data => res(data))
            .catch(err => rej(err));
        })
      });
    },
    registerUser: userData => {
      dispatch({
        type: "USER_REGISTER",
        payload: new Promise((res, rej) => {
          remote
            .post(USER_REGISTER, userData)
            .then(data => data.json())
            .then(data => {
              if (data.success) {
                return {
                  authed: true,
                  success: data.success,
                  message: data.message
                };
              } else {
                return {
                  authed: false,
                  success: data.success,
                  message: data.message
                };
              }
            })
            .then(data => res(data))
            .catch(err => rej(err));
        })
      });
    },
    logoutUser: () => {
      sessionStorage.removeItem("token");
      dispatch({
        type: "USER_LOGOUT"
      });
    }
  };
};
