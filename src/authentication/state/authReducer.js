import {combineReducers} from "redux";
import driversReducer from "../carOwners/state/driversReducer";
import banksReducer from "./reducers/banksReducer";
import bankAccountReducer from "./reducers/bankAccountReducer";
import advertismentMediaTypeReducer from "./reducers/advertismentMediaTypeReducer";
import placesReducer from "./reducers/placesReducer";
import advertiserReducer from "../advertisers/state/advertiserReducer";
import adminReducer from "../admin/state/adminReducer";
import commonReducer from "../commons/state/commonReducer";
import downloaderReducer from "../downloader/state/downloaderReducer";


export default combineReducers({
    driversReducers: driversReducer,
    downloaderReducers:downloaderReducer,
    advertisersReducers:advertiserReducer,
    adminReducers:adminReducer,
    commonReducer:commonReducer,
    banksReducer:banksReducer,
    bankAccountReducer:bankAccountReducer,
    advertisementMediaType:advertismentMediaTypeReducer,
    placeReducer:placesReducer
})
