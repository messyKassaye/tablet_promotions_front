import {combineReducers} from "redux";
import carsReducer from "./reducers/carsReducer";
import advertMediaReducer from "./reducers/advertMediaReducer";

export default combineReducers({
    categoriesReducer:carsReducer,
    mediaReducer:advertMediaReducer
})