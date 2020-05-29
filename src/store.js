import {createStore, applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
const  middleware = [thunk]
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),ReactReduxDevTools
))

export  default store