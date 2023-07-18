import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { loginReducer, modalReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ loginReducer, modalReducer });

const middleWare = [thunk];

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));
