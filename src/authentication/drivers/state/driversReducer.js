import {combineReducers} from "redux";
import depositReducer from "./reducers/depositReducer";
import financeReducer from "./reducers/financeReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import dialogReducer from "./reducers/dialogReducer";
import carsReducer from "./reducers/carsReducer";
import withdrawalReducers from "./reducers/withdrawalReducers";
import paymentReducers from "./reducers/paymentReducers";

export default combineReducers({
    depositData:depositReducer,
    financeData:financeReducer,
    categoriesData:categoriesReducer,
    carsData:carsReducer,
    dialogsData:dialogReducer,
    withdrawalsData:withdrawalReducers,
    paymentsData:paymentReducers
})