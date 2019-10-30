import {combineReducers} from "redux";
import driversReducer from "../drivers/state/driversReducer";
import banksReducer from "./reducers/banksReducer";
import bankAccountReducer from "./reducers/bankAccountReducer";
import advertismentMediaTypeReducer from "./reducers/advertismentMediaTypeReducer";
import placesReducer from "./reducers/placesReducer";
import advertReducer from "../advertisers/state/reducer/advertReducer";


export default combineReducers({
    driversReducers: driversReducer,
    advertiserReducer:advertReducer,
    banksReducer:banksReducer,
    bankAccountReducer:bankAccountReducer,
    advertisementMediaType:advertismentMediaTypeReducer,
    placeReducer:placesReducer
})