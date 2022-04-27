import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CartItem from "../components/CartItem";
import TotalAmount from "../components/TotalAmount";
import Button from "../components/Button";

class Cart extends React.PureComponent {
  state = {
    tax: 15,
  };
  render() {
    const { props, state } = this;
    const { cart, currency } = props;
    const { tax } = state;
    const qtyMap = cart.map((cartItem) => {
      return Number(cartItem.quantity);
    });
    const addQtys = (total, num) => {
      return total + num;
    };
    const qty = () => {
      if (cart.length > 0) {
        return qtyMap.reduce(addQtys);
      }
    };
    return (
      <div className="cart section">
        <h1 className="name">Cart</h1>
        {cart.length > 0 &&
          cart.map((cartItem, i) => {
            const { product } = cartItem;
            const price = product.prices.find(
              (price) => currency === price.currency.symbol
            );
            return (
              <div className="cart_item" key={i}>
                <CartItem i={i} price={price} cartItem={cartItem} />
              </div>
            );
          })}
        {cart.length > 0 && (
          <div className="totalPrice">
            <div>
              <p>Tax:</p>
              <span>
                {currency}
                {this.state.tax}
              </span>
            </div>
            <div>
              <p>Qty:</p>
              <span>{qty()}</span>
            </div>
            <div>
              <p>Total:</p>
              <span>
                <TotalAmount tax={tax} />
              </span>
            </div>
            <div className="button">
              <Button text="order" />
            </div>
          </div>
        )}

        {cart.length < 1 && <p>Your cart is empty</p>}
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartIncrement: (indexValue) =>
      dispatch({ type: "INC_CART", payload: indexValue }),
    cartDecrement: (indexValue) =>
      dispatch({ type: "DEC_CART", payload: indexValue }),
    deleteFromCart: (indexValue) =>
      dispatch({ type: "DELETE_FROM_CART", payload: indexValue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
