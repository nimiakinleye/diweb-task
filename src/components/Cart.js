import React from "react";
import { connect } from "react-redux";
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';
import CartItem from './CartItem'

class Cart extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }  
  render() {
    const { cart } = this.props.cart;
    return (
      <div className="cart section">
        <h1 className="name">Cart</h1>
        {cart.length > 0 &&
          cart.map((cartItem, i) => {
            const { product } = cartItem;
            const price = product.prices.find(
              (price) => this.props.currency.currency === price.currency.symbol
            );
            return (
              <div className="cart_item" key={i}>
                <CartItem i={i} price={price} cartItem={cartItem}/>
                {/* <div className="details">
                  <h1>{product.name}</h1>
                  <p className="brand">{product.brand}</p>
                  <p className="price">
                    {price.currency.symbol}
                    {price.amount}
                  </p>
                  <div className="attributes">
                    {cartItem.attributes.map((attribute) => {
                      return (
                        <div key={attribute.name} className="attribute">
                          <h1>{attribute.name}</h1>
                          <p>{attribute.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="img_qty">
                  <div className="qtys">
                    <div onClick={() => {this.props.cartIncrement(i)}} className="qty">
                      <img src={Plus} alt="" />
                    </div>
                    <div className="qty_value">{cartItem.quantity}</div>
                    <div onClick={() => {this.decreaseCart(i, cartItem.quantity)}} className="qty">
                      <img src={Minus} alt="" />
                    </div>
                  </div>
                  <div className="img_bg">
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${product.gallery[0]})` }}
                    ></div>
                  </div>
                </div> */}
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
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    cartIncrement: (indexValue) => dispatch({ type: 'INC_CART', payload: indexValue }),
    cartDecrement: (indexValue) => dispatch({ type: 'DEC_CART', payload: indexValue }),
    deleteFromCart: (indexValue) => dispatch({type: 'DELETE_FROM_CART', payload: indexValue}),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
