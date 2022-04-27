import React from "react";
import PropTypes from "prop-types";
import Cart from "../assets/icons/whiteCart.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductCard extends React.PureComponent {
  render() {
    const addToCart = (product) => {
      if (product.attributes.length === 0) {
        return (
          this.props.addToCart(product, product.attributes),
          this.props.throwNoty("Item successfully added to cart"),
          setTimeout(this.props.resetNoty, 3000)
        );
      }
    };
    const { props } = this;
    const { product, currency } = props;
    const price = product.prices.find((price) => {
      return price.currency.symbol === currency;
    });
    const divStyle = {
      backgroundImage: `url(${product.gallery[0]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "354px",
      height: "330px",
      position: "relative",
    };
    return (
      <div className="product_card">
        {!product.inStock && <div className="out_of_stock"></div>}
        <div className="product_link">
          <Link to={`/product/${product.id}`}>
            <div style={divStyle} className="productImage">
              {!product.inStock && (
                <div className="out_of_stock_text">
                  <p>out of stock</p>
                </div>
              )}
            </div>
          </Link>
          {product.attributes.length === 0 && (
            <div
              onClick={() => {
                addToCart(product);
              }}
              className="cartIcon cursor_pointer"
              data-tooltip="Add to cart"
            >
              <img src={Cart} alt="" />
            </div>
          )}
          {product.attributes.length > 0 && (
            <div className="cartIcon cursor_pointer" data-tooltip="Add to cart">
              <Link to={`/product/${product.id}`}>
                <img src={Cart} alt="" />
              </Link>
            </div>
          )}
        </div>

        <div
          style={{
            height: "2px",
            width: "100%",
            background: "#e6e6e6",
            marginBottom: "24px",
          }}
        ></div>
        <Link to={`/product/${product.id}`} className="no_decoration">
          <div className="name">{product.name}</div>
        </Link>
        <p className="price">
          {price.currency.symbol}
          {price.amount}
        </p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  throwNoty: PropTypes.func.isRequired,
  resetNoty: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return state.currency;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, attributes) =>
      dispatch({ type: "ADD_TO_CART", payload: { product, attributes } }),
    throwNoty: (body) =>
      dispatch({ type: "THROW_NOTIFICATION", payload: body }),
    resetNoty: () => dispatch({ type: "RESET_NOTIFICATION" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
