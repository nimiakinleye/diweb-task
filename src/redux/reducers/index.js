import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart"

export default combineReducers({ currency, cart });
