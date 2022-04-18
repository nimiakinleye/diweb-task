import { CHANGE_CURRENCY } from "./actionTypes";
import { ADD_TO_CART } from "./actionTypes";

export const changeCurrency = (newCurrency) => ({
  type: CHANGE_CURRENCY,
  payload: {
    newCurrency
  }
})

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    product
  }
})