import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import locationReducer from "./locationReducer"

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    location: locationReducer

});