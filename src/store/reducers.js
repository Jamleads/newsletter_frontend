import { combineReducers } from "redux";
import authReducer from "../Feature/AuthSlice";
import userReducer from "../Feature/GetUserSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  allUsers: userReducer,
  // other reducers...
});

export default rootReducer;
