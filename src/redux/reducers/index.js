import { combineReducers } from "redux";
import PostReducer from "../reducers/postReducer";
import NotificationReducer from "../reducers/notificationReducer";

export default combineReducers({
  posts: PostReducer,
  notification: NotificationReducer
});
