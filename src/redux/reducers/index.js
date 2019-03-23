import { combineReducers } from "redux";
import PostReducer from "../reducers/postReducer";
import NotificationReducer from "../reducers/notificationReducer";
import UserReducer from "../reducers/userReducer";

export default combineReducers({
  posts: PostReducer,
  notification: NotificationReducer,
  user: UserReducer
});
