import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import Comment from "./modules/comment";
import Post from "./modules/post";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  comment: Comment,
  post: Post,
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const enhancer = applyMiddleware(...middlewares);

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
