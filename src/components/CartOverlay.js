import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { connect } from "react-redux";
import Plus from "../assets/icons/plus.svg";
import Minus from "../assets/icons/minus.svg";
import TotalAmount from "./TotalAmount";

class CartOverlay extends React.Component {
  decreaseCart = (i, quantity) => {
    if (quantity > 1) {
      this.props.cartDecrement(i);
    } else this.props.deleteFromCart(i);
  };
  render() {
    const { cart } = this.props.cart;
    return (
      <div className="cart_overlay">
        <div className="bag">
          <h1 className="title">
            My Bag,<span>{cart.length} item(s)</span>
          </h1>
          <div className="cartItems">
            {cart.length > 0 &&
              cart.map((cartItem, i) => {
                const { product } = cartItem;
                const price = product.prices.find((price) => {
                  return price.currency.symbol === this.props.currency.currency;
                });
                return (
                  <div className="cartItem" key={i}>
                    <div className="text">
                      <div className="name">
                        <p>{product.name}</p>
                        <p className="brand">{product.brand}</p>
                      </div>
                      <div className="price">
                        {price.currency.symbol}
                        {price.amount * cartItem.quantity}
                      </div>
                      <div className="attributes">
                        {cartItem.attributes.map((attribute) => {
                          return (
                            <div key={attribute.name} className="attribute">
                              {attribute.name !== "Color" && (
                                <>
                                  <h1>{attribute.name}</h1>
                                  <p>{attribute.value}</p>
                                </>
                              )}
                              {attribute.name === "Color" && (
                                <>
                                  <h1>{attribute.name}</h1>
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      border: "1px solid black",
                                      marginLeft: "10px",
                                      background: `${attribute.value}`,
                                    }}
                                  ></div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="img_qty">
                      <div className="qtys">
                        <div
                          onClick={() => {
                            this.props.cartIncrement(i);
                          }}
                          className="qty"
                        >
                          <img src={Plus} alt="" />
                        </div>
                        <div className="qty_value">{cartItem.quantity}</div>
                        <div
                          onClick={() => {
                            this.decreaseCart(i, cartItem.quantity);
                          }}
                          className="qty"
                        >
                          <img src={Minus} alt="" />
                        </div>
                      </div>
                      <div className="img_bg">
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(${product.gallery[0]})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {cart.length > 0 && (
            <div className="total_price">
              <p>Total</p>
              <p>
                <TotalAmount />
              </p>
              {/* <p>{this.props.currency.currency}{this.props.cart.totalPrice}</p> */}
            </div>
          )}
          <div className="links">
            <Link to="/cart">
              <Button type="stroke" text="view bag" />
            </Link>
            <Link to="/cart">
              <Button text="checkout" />
            </Link>
          </div>
        </div>
        <div onClick={this.props.toggle} className="modal_env"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
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

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
