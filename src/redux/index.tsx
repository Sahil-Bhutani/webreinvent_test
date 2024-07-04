import { combineReducers } from "redux";
import {
  loginDataReducer,
  registerDataReducer,
  userDataReducer,
} from "./slices/authentication";
import { AnyAction } from "redux";

const appReducer = combineReducers({
  login: loginDataReducer,
  register: registerDataReducer,
  userData: userDataReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "RESET") {
    state = undefined; // Resetting state to undefined will clear all reducers' states
  }
  
  return appReducer(state, action);
};

export default rootReducer;
