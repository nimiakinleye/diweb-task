import { ADD_TO_CART } from "../actionTypes";

const initialState = {
  cart: [],
};

export default function (state = initialState, action) {
  if (action.type === ADD_TO_CART) {
    return (
      console.log(state.cart),
      {
        cart: [...state.cart, action.payload]
      }
    );
  } else return state;
}
