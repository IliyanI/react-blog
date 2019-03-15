/* eslint-disable default-case */
function notificationReducer(state = { message: null, class: null }, action) {
  switch (action.type) {
    case "NOTIFY_ERROR":
      state = {
        ...state,
        class: "error",
        message: action.payload
      };
      break;
    case "NOTIFY_SUCCESS":
      state = {
        ...state,
        class: "success",
        message: action.payload
      };
  }
  return state;
}

export default notificationReducer;
