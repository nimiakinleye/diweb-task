import { THROW_NOTIFICATION } from "../actionTypes";
import { RESET_NOTIFICATION } from "../actionTypes";

const initialState = {
  display: false,
  body: null,
};

const noty = (state = initialState, action) => {
  if (action.type === THROW_NOTIFICATION) {
    return {
      display: true,
      body: action.payload,
    };
  }
  if (action.type === RESET_NOTIFICATION) {
    return {
      display: false,
      body: null,
    };
  }
  else return state;
};

export default noty;
