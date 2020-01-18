import {combineReducers} from "redux";
import dialogReducer from "./reducerrs/dialogReducer";
import base64Reducer from "./reducerrs/base64Reducer";
import AdminBankReducer from "./reducerrs/AdminBankReducer";
import roleReducer from "./reducerrs/roleReducers";
import deleteReducer from "./reducerrs/deleteReducers";
import bankAccountSetterReducer from "./reducerrs/bankAccountSetterReducer";
import carCategoryReducer from "./reducerrs/carCategoryReducer";
import currencyReducer from "./reducerrs/currencyReducer";
import advertMediaTypeReducer from "./reducerrs/advertMediaTypeReducer";
import advertsReducer from "./reducerrs/advertsReducer";
import adminUserReducer from "./reducerrs/adminUserReducer";
import adminCompaniesReducer from "./reducerrs/adminCompaniesReducer";
import adminFinanceReducer from "./reducerrs/adminFinanceReducer";
import adminPlaceReducer from "./reducerrs/adminPlaceReducer";

export default combineReducers({
    adminDialog:dialogReducer,
    bankReducer:AdminBankReducer,
    base64:base64Reducer,
    roleReducer:roleReducer,
    deleteReducer:deleteReducer,
    bankAccountReducer:bankAccountSetterReducer,
    categoryReducer:carCategoryReducer,
    currenciesReducer:currencyReducer,
    advertMediaReducer:advertMediaTypeReducer,
    advertReducer:advertsReducer,
    adminUsersReducers:adminUserReducer,
    adminCompanyReducer: adminCompaniesReducer,
    adminFinancesReducer:adminFinanceReducer,
    adminPlacesReducer:adminPlaceReducer
})
