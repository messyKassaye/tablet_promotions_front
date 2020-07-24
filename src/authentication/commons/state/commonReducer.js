import {combineReducers} from "redux";
import advertMediaTypeReducer from "./reducer/advertMediaTypeReducer";
import commonAdvertPlaceReducer from "./reducer/commonAdvertPlaceReducer";
import commonAdvertReducer from "./reducer/commonAdvertReducer";
import commonTabAdvertBanksReducer from "./reducer/commonTabAdvertBanksReducer";
import commonBanksReducer from "./reducer/commonBanksReducer";
import commonAdvertPaymentTransactionReducer from "./reducer/commonAdvertPaymentTransactionReducer";
import commonAdvertComplainReducer from "./reducer/commonAdvertComplainReducer";
import NotificationReducer from "./reducer/NotificationReducer";
import ResetPasswordReducer from "./reducer/ResetPasswordReducer";
import advertViewPaymentReducer from "./reducer/advertViewPaymentReducer";
import CommonCarAdvertReducer from "./reducer/CommonCarAdvertReducer";
import advertViewReducers from "./reducer/advertViewReducers";
import topAdvertedCompanyReducer from "./reducer/topAdvertedCompanyReducer";
import perPlayAdvertReducer from "./reducer/AdvertCheckerReducer";
import AdvertCheckerReducer from "./reducer/AdvertCheckerReducer";
import CarAdvertCheckerReducer from "./reducer/CarAdvertCheckerReducer";

export default combineReducers({
    commonAdvertMediaReducer:advertMediaTypeReducer,
    commonAdvertsReducer:commonAdvertReducer,
    commonAdvertPlacesReducer:commonAdvertPlaceReducer,
    commonTabAdvertsBanks:commonTabAdvertBanksReducer,
    commonBanks:commonBanksReducer,
    commonAdvertPaymentTransactionReducers:commonAdvertPaymentTransactionReducer,
    commonAdvertsComplainReducer:commonAdvertComplainReducer,
    commonNotificationsReducer:NotificationReducer,
    resetPasswordReducer:ResetPasswordReducer,
    paymentReducer:advertViewPaymentReducer,
    commonCarAdvertsReducer:CommonCarAdvertReducer,
    commonAdvertViewReducer:advertViewReducers,
    commonTopAdvertedCompanies:topAdvertedCompanyReducer,
    commonAdvertChecker:AdvertCheckerReducer,
    commonCarAdvertChecker:CarAdvertCheckerReducer
})
