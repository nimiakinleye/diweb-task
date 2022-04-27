import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TotalAmount extends React.PureComponent {
  getTotalAmount = () => {
    const { cart } = this.props;
    const totalPrice = {};
    const priceArray = cart.map((cartItem) => {
      return cartItem.product.prices.map((price) => {
        return {
          currency: price.currency.symbol,
          amount: price.amount * cartItem.quantity,
          quantity: cartItem.quantity,
        };
      });
    });
    priceArray.forEach((prices) => {
      prices.forEach((price) => {
        if (totalPrice[price.currency]) {
          totalPrice[price.currency] += price.amount;
        } else {
          totalPrice[price.currency] = price.amount;
        }
      });
    });
    return totalPrice;
  };
  render() {
    const totalPrice = this.getTotalAmount();
    const { props } = this;
    const { currency, tax } = props;
    return (
      <>
        {tax && (
          <>
            {currency}
            {Math.round(Number(totalPrice[currency] + tax))}
          </>
        )}
        {!tax && (
          <>
            {currency}
            {Math.round(Number(totalPrice[currency]))}
          </>
        )}
      </>
    );
  }
}

TotalAmount.propTypes = {
  cart: PropTypes.array.isRequired,
  currency: PropTypes.string,
  tax: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currency: state.currency.currency,
  };
};
export default connect(mapStateToProps)(TotalAmount);
