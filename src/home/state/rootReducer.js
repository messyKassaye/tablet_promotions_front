import {combineReducers} from "redux";
import roleReducer from "./reducers/roleReducer";
import authenticationReducer from "./reducers/authenticationReducer";
export default combineReducers({
   role:roleReducer,
   auth:authenticationReducer
})