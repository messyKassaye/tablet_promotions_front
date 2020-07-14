import {combineReducers} from "redux";
import carsReducer from "./reducers/carsReducer";
import advertMediaReducer from "./reducers/advertMediaReducer";
import roleReducer from "./reducers/roleReducer";
import globalAccessorReducer from "./reducers/globalAccessorReducer";
import driverLinkReducer from "./reducers/driverLinkReducer";
import dialogReducer from "./reducers/dialogReducer";

export default combineReducers({
    categoriesReducer:carsReducer,
    mediaReducer:advertMediaReducer,
    roleReducer:roleReducer,
    globalReducer:globalAccessorReducer,
    driverLinkReducer:driverLinkReducer,
    homeDialogReducer:dialogReducer
})