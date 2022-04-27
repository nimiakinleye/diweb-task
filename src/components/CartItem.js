import React from "react";
import { connect } from "react-redux";
import Plus from "../assets/icons/plus.svg";
import Minus from "../assets/icons/minus.svg";
import Next from "../assets/icons/next.svg";
import Previous from "../assets/icons/previous.svg";

class CartItem extends React.PureComponent {
  state = {
    productImage: 0,
  };
  decreaseCart = (i, quantity) => {
    if (quantity > 1) {
      this.props.cartDecrement(i);
    } else this.props.deleteFromCart(i);
  };
  nextImage = (length) => {
    if (this.state.productImage !== length - 1) {
      this.setState({
        productImage: this.state.productImage + 1,
      });
    }
  };
  prevImage = () => {
    if (this.state.productImage !== 0) {
      this.setState({
        productImage: this.state.productImage - 1,
      });
    }
  };
  render() {
    const {props} = this
    const { product } = props.cartItem;
    const { i } = props;
    return (
      <>
        <div className="details">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="price">
            {this.props.price.currency.symbol}
            {this.props.price.amount *props.cartItem.quantity}
          </p>
          <div className="attributes">
            {this.props.cartItem.attributes.map((attribute) => {
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
                      <div style={{width: '20px', height: '20px', marginLeft: '10px', border: "1px solid black", background: `${attribute.value}`}}></div>
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
            <div className="qty_value">{this.props.cartItem.quantity}</div>
            <div
              onClick={() => {
                this.decreaseCart(i, this.props.cartItem.quantity);
              }}
              className="qty"
            >
              <img src={Minus} alt="" />
            </div>
          </div>
          <div className="img_bg">
            <div className="next_prev">
              <img
                onClick={() => {
                  this.prevImage();
                }}
                src={Previous}
                alt=""
              />
              <img
                onClick={() => {
                  this.nextImage(product.gallery.length);
                }}
                src={Next}
                alt=""
              />
            </div>
            <div
              className="img"
              style={{
                backgroundImage: `url(${
                  product.gallery[this.state.productImage]
                })`,
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}

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

export default connect(null, mapDispatchToProps)(CartItem);
