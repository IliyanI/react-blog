import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers/index.js";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise-middleware";
import logger from "redux-logger";
const initialState = {
  posts: []
};

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(logger, thunk, reduxPromise)
);

export default store;
