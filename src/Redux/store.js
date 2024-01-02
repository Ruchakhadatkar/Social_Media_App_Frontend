import { combineReducers, createStore } from "redux";
import { userReducer } from "./User/userReducer";
import { postReducer } from "./Posts/PostsReducer";

const reducer = combineReducers({user:userReducer, posts: postReducer})
export const store = createStore(reducer)


