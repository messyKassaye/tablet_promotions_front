import {combineReducers} from "redux";
import dialogReducer from "./reducerrs/dialogReducer";
import base64Reducer from "./reducerrs/base64Reducer";
import AdminBankReducer from "./reducerrs/AdminBankReducer";
import roleReducer from "./reducerrs/roleReducers";
import deleteReducer from "./reducerrs/deleteReducers";

export default combineReducers({
    adminDialog:dialogReducer,
    bankReducer:AdminBankReducer,
    base64:base64Reducer,
    roleReducer:roleReducer,
    deleteReducer:deleteReducer
})
