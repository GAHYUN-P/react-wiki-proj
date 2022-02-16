import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import post from "./modules/post";
import likes from "./modules/likes";
import category from "./modules/category";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    post: post,
    likes: likes,
    category: category,
    router: connectRouter(history),
  });
  
// const middlewares = [thunk];
const middlewares = [thunk.withExtraArgument({history: history})];

const middlewares = [thunk.withExtraArgument({ history: history })];

const enhancer = applyMiddleware(...middlewares);

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
