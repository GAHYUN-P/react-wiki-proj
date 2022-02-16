//configStore.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import post from "./modules/post";
import likes from "./modules/likes";
import category from "./modules/category";

export const history = createBrowserHistory();

//history와 router가 연결되었다!
const rootReducer = combineReducers({
    post: post,
    likes: likes,
    category: category,
    router: connectRouter(history),
  });
  
// const middlewares = [thunk];
const middlewares = [thunk.withExtraArgument({history: history})];


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    
const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();