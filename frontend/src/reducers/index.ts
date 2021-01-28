import { combineReducers } from "redux";
import chatlog from "./chatlog";
import user from "./user";
import { createStore } from "redux";

const reducer = combineReducers({
  chatlog,
  user,
});

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
