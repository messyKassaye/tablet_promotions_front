import {combineReducers} from "redux";
import PivotReducer from "./reducer/PivotReducer";
import DownloadReducer from "./reducer/DownloadReducer";

export default combineReducers({
    pivotsReducer:PivotReducer,
    downloadsReducer:DownloadReducer
})