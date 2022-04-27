import React from "react";
import {connect} from 'react-redux'

class TotalAmount extends React.PureComponent{
  getTotalAmount = () => {
    const { cart } = this.props.cart;
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
  render () {
    const totalPrice = this.getTotalAmount()
    const {currency} = this.props.currency
    return (
      <>
        {this.props.tax &&
          <>{currency}{Math.round(Number(totalPrice[currency]+this.props.tax))}</>
        }
        {!this.props.tax &&
          <>{currency}{Math.round(Number(totalPrice[currency]))}</>
        }
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  }
}
export default connect(mapStateToProps)(TotalAmount);