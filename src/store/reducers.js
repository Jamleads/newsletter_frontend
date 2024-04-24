import { combineReducers } from "redux";
import authReducer from "../Feature/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers...
});

export default rootReducer;
