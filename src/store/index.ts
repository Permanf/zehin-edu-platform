import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./reducers/auth";
import data from './reducers/data'
 
const reducer = combineReducers({
    auth, data
});
 
const store = configureStore({
    reducer,
});
 
export default store;