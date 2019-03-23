function removeClass() {
  if (document.querySelector("#root > div.notification > label")) {
    document
      .querySelector("#root > div.notification > label")
      .classList.remove("disappear");
  }
}
export default dispatch => {
  return {
    notifyError: message => {
      removeClass();
      dispatch({
        type: "NOTIFY_ERROR",
        payload: message
      });
    },
    notifySuccess: message => {
      removeClass();
      dispatch({
        type: "NOTIFY_SUCCESS",
        payload: message
      });
    }
  };
};
