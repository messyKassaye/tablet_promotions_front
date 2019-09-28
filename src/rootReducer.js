import {combineReducers} from "redux";
import roleReducer from "./home/state/reducers/roleReducer";
import usersReducer from "./authentication/drivers/state/reducers/usersReducer";
import financeReducer from "./authentication/drivers/state/reducers/financeReducer";
export default combineReducers({
   role:roleReducer,
   userData: usersReducer,
   financeData:financeReducer
})