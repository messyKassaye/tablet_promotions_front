import {combineReducers} from "redux";
import roleReducer from "./home/state/reducers/roleReducer";
import usersReducer from "./authentication/state/reducers/usersReducer";
import authReducer from "./authentication/state/authReducer";
export default combineReducers({
   role:roleReducer,
   userData: usersReducer,
   authReducer:authReducer
})