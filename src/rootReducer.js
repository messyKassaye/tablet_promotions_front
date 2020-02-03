import {combineReducers} from "redux";
import roleReducer from "./home/state/reducers/roleReducer";
import usersReducer from "./authentication/state/reducers/usersReducer";
import authReducer from "./authentication/state/authReducer";
import homeReducer from "./home/state/homeReducer";
export default combineReducers({
   role:roleReducer,
   userData: usersReducer,
   homeReducer:homeReducer,
   authReducer:authReducer
})