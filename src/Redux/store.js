import { combineReducers, createStore } from "redux";
import { userReducer } from "./User/userReducer";

const reducer = combineReducers({user:userReducer})
export const store = createStore(reducer)


