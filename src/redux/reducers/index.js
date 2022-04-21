import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart"
import noty from "./noty"

export default combineReducers({ currency, cart, noty });
