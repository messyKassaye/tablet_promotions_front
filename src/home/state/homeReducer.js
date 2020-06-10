import {combineReducers} from "redux";
import carsReducer from "./reducers/carsReducer";
import advertMediaReducer from "./reducers/advertMediaReducer";
import roleReducer from "./reducers/roleReducer";

export default combineReducers({
    categoriesReducer:carsReducer,
    mediaReducer:advertMediaReducer,
    roleReducer:roleReducer
})