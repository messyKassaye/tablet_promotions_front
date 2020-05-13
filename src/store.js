import {createStore, applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
const  middleware = [thunk]

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
))

export  default store