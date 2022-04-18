import { CHANGE_CURRENCY } from "../actionTypes"

const initialState = {
  currency: '$'
}

export default function (state = initialState, action) {
  if (action.type === CHANGE_CURRENCY) {
    return {
      ...state,
      currency: action.payload
    }
  }
  else return state
}