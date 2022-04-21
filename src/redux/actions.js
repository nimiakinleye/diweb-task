import {
  CHANGE_CURRENCY,
  ADD_TO_CART,
  DELETE_FROM_CART,
  INC_CART,
  DEC_CART,
  THROW_NOTIFICATION,
  RESET_NOTIFICATION,
} from "./actionTypes";

export const changeCurrency = (newCurrency) => ({
  type: CHANGE_CURRENCY,
  payload: {
    newCurrency,
  },
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    product,
    attributes,
  },
});

export const deleteFromCart = (indexValue) => ({
  type: DELETE_FROM_CART,
  payload: {
    indexValue
  }
})

export const cartIncrement = (indexValue) => ({
  type: INC_CART,
  payload: {
    indexValue,
  },
});

export const cartDecrement = (indexValue) => ({
  type: DEC_CART,
  payload: {
    indexValue,
  },
});

export const throwNotification = (body) => ({
  type: THROW_NOTIFICATION,
  payload: {
    body,
  },
});

export const resetNotification = () => ({
  type: RESET_NOTIFICATION,
});
