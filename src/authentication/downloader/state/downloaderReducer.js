import {combineReducers} from "redux";
import PivotReducer from "./reducer/PivotReducer";
import DownloadReducer from "./reducer/FileHandlerReducer";

export default combineReducers({
    pivotsReducer:PivotReducer,
    downloadsReducer:DownloadReducer
})