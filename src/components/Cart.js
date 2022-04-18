import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const {cart} = this.props.cart
    return (
      <div className="cart section">
        <h1 className="name">Cart</h1>
        {cart.length > 0 &&
          cart.map((cartItem) => {
            const {product} = cartItem
            const price = product.prices.find((price) => this.props.currency.currency === price.currency.symbol)
            return (
              <div className="cart_item" key={product.id}>
                <div className="details">
                  <h1>{product.name}</h1>
                  <p>{product.brand}</p>
                  <p className="price">{price.currency.symbol}{price.amount}</p>
                </div>
                <div className="img_qty">
                  <div className="img_bg">
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${product.gallery[0]})` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        {cart.length < 1 && <p>Your cart is empty</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency
  }
};

export default connect(mapStateToProps)(Cart);
