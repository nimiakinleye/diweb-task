import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { connect } from "react-redux";

class CartOverlay extends React.Component {
  componentDidMount() {
    console.log(this.props.cart);
  }
  render() {
    const { cart } = this.props;
    return (
      <div className="cart_overlay">
        <div className="bag" onClick={this.props.print}>
          <h1 className="title">
            My Bag,<span>{cart.length} item(s)</span>
          </h1>
          <div className="cartItems">
            {cart.length > 0 &&
              cart.map((cartItem) => {
                const { product } = cartItem;
                return (
                  <div className="cartItem" key={product.id}>
                    <div className="text">
                      <div className="name">
                        <p>{product.name}</p>
                        <p>{product.brand}</p>
                      </div>
                    </div>
                    <div className="img_qty">
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
  return state.cart;
};

export default connect(mapStateToProps)(CartOverlay);
