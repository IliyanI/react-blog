/* eslint-disable default-case */
function userReducer(
  state = {
    authed: false,
    token: "",
    userData: undefined,
    register: { success: undefined, message: undefined }
  },
  action
) {
  switch (action.type) {
    case "IS_AUTHED_FULFILLED":
      state = {
        ...state,
        authed: action.payload.authed,
        userData: action.payload.userData
      };
      break;
    case "USER_LOGIN_FULFILLED":
      state = {
        ...state,
        authed: action.payload.authed,
        userData: action.payload.userData,
        token: action.payload.token
      };
      break;
    case "USER_LOGOUT":
      state = {
        ...state,
        authed: false,
        userData: undefined,
        token: ""
      };
      break;
    case "USER_REGISTER_FULFILLED":
      state = {
        ...state,
        register: {
          success: action.payload.success,
          message: action.payload.message
        }
      };
      break;
  }
  return state;
}

export default userReducer;
