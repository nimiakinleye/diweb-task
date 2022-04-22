import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  INC_CART,
  DEC_CART,
} from "../actionTypes";

const initialState = {
  totalPrice: 0,
  cart: [],
};

// const getTotalAmount = (state) => {
//   const totalPrice = {};
//   const priceArray = state.cart.map((cartItem) => {
//     return cartItem.product.prices.map((price) => {
//       return {
//         currency: price.currency.symbol,
//         amount: price.amount * cartItem.quantity,
//         quantity: cartItem.quantity,
//       };
//     });
//   });
//   priceArray.forEach((prices) => {
//     prices.forEach((price) => {
//       if (totalPrice[price.currency]) {
//         totalPrice[price.currency] += price.amount;
//       } else {
//         totalPrice[price.currency] = price.amount;
//       }
//     });
//   });
//   return totalPrice;
// };

const cart = (state = initialState, action) => {
  const { payload } = action;
  if (action.type === ADD_TO_CART) {
    if (state.cart.length === 0) {
      return { ...state, cart: [{ ...payload, quantity: 1 }] };
    }
    if (state.cart.length > 0) {
      // const existingItem = state.cart.find((cartItem) => {
      //   return (
      //     cartItem.product.id === payload.product.id &&
      //     JSON.stringify(cartItem.attributes) ===
      //       JSON.stringify(payload.attributes)
      //   );
      // });

      // console.log(existingItem);

      // if (existingItem === undefined) {
      //   return {
      //     cart: [...state.cart, {...payload, quantity: 1}],
      //   }
      // }

      // if (existingItem !== undefined) {
      //   state.cart.filter(cartItem => {
      //     return cartItem.product.id !== existingItem.product.id && JSON.stringify(cartItem.attributes) !== JSON.stringify(existingItem.attributes)
      //   })
      //   return {
      //     ...state,
      //     cart: [{...existingItem, quantity: existingItem.quantity + 1}, ...state.cart],
      //   }
      // }
      return {
        ...state,
        cart: [{ ...payload, quantity: 1 }, ...state.cart],
      };
    }
  }
  if (action.type === DELETE_FROM_CART) {
    state.cart.splice(payload, 1);
    return {
      ...state,
    };
  }
  if (action.type === INC_CART) {
    const newCart = state.cart.map((cartItem, index) => {
      if (index === payload) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      } else return cartItem;
    });
    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type === DEC_CART) {
    const newCart = state.cart.map((cartItem, index) => {
      if (index === payload) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      } else return cartItem;
    });
    return {
      ...state,
      cart: newCart,
    };
  } else return state;
};

export default cart;
