import {combineReducers} from "redux";
import driversReducer from "../drivers/state/driversReducer";
import banksReducer from "./reducers/banksReducer";
import bankAccountReducer from "./reducers/bankAccountReducer";


export default combineReducers({
    driversReducers: driversReducer,
    banksReducer:banksReducer,
    bankAccountReducer:bankAccountReducer
})