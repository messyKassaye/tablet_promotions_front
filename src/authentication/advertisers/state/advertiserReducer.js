import advertReducer from "./reducer/advertReducer";
import {combineReducers} from "redux";
import companyBanksReducer from "./reducer/companyBanksReducer";
import advertiserDialogReducers from "./reducer/advertiserDialogReducers";
import advertPaymentTransactionReducer from "./reducer/advertPaymentTransactionReducer";
import companyReducer from "./reducer/companyReducer";

export default combineReducers({
    advertData:advertReducer,
    banksData:companyBanksReducer,
    dialogsData:advertiserDialogReducers,
    advertPaymentConfirmation:advertPaymentTransactionReducer,
    companyData:companyReducer
})
