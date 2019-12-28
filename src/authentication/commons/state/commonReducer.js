import {combineReducers} from "redux";
import advertMediaTypeReducer from "./reducer/advertMediaTypeReducer";
import commonAdvertPlaceReducer from "./reducer/commonAdvertPlaceReducer";
import commonAdvertReducer from "./reducer/commonAdvertReducer";
import commonTabAdvertBanksReducer from "./reducer/commonTabAdvertBanksReducer";
import commonBanksReducer from "./reducer/commonBanksReducer";
import commonAdvertPaymentTransactionReducer from "./reducer/commonAdvertPaymentTransactionReducer";

export default combineReducers({
    commonAdvertMediaReducer:advertMediaTypeReducer,
    commonAdvertsReducer:commonAdvertReducer,
    commonAdvertPlacesReducer:commonAdvertPlaceReducer,
    commonTabAdvertsBanks:commonTabAdvertBanksReducer,
    commonBanks:commonBanksReducer,
    commonAdvertPaymentTransactionReducers:commonAdvertPaymentTransactionReducer
})
