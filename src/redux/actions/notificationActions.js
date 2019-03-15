export default dispatch => {
  return {
    notifyError: message => {
      dispatch({
        type: "NOTIFY_ERROR",
        payload: message
      });
    },
    notifySuccess: message => {
      dispatch({
        type: "NOTIFY_SUCCESS",
        payload: message
      });
    }
  };
};
