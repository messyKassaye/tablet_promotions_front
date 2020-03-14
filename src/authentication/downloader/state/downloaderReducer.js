import {combineReducers} from "redux";
import DownloadReducer from "./reducer/FileHandlerReducer";
import AddressReducer from "./reducer/AddressReducer";

export default combineReducers({
    addressReducers:AddressReducer,
    downloadsReducer:DownloadReducer
})