import { CHANGE_CURRENCY } from "../actionTypes"

const initialState = {
  currency: '$'
}

const currency = (state = initialState, action) => {
  if (action.type === CHANGE_CURRENCY) {
    console.log(action.payload)
    return {
      currency: action.payload,
    }
  }
  else return state
}

export default currency;