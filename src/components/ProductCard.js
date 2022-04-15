import React, { Component } from "react";
import Cart from "../assets/icons/whiteCart.svg";
import { Link, NavLink } from "react-router-dom";

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const price = product.prices.find((price) => {
      return price.currency.symbol === this.props.currency;
    });
    const divStyle = {
      backgroundImage: `url(${product.gallery[0]})`,
      backgroundSize: "cover",
      width: "354px",
      height: "330px",
      position: "relative",
      // marginBottom: '6px',
    };
    return (
      // console.log(price),
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
          <div className="cartIcon cursor_pointer" data-tooltip="Add to cart">
            <img src={Cart} alt="" />
          </div>
        </div>

        <div
          style={{ height: "2px", width: "100%", background: "#e6e6e6" }}
        ></div>
        <p className="name">{product.name}</p>
        <p className="price">
          {price.currency.symbol}
          {price.amount}
        </p>
        <div className="attributes">
          {product.attributes.map((attribute) => {
            return (
              <div className="attribute uppercase" key={attribute.id}>
                <p>{attribute.name}:</p>
                <div className="items">
                  {attribute.type !== "swatch" &&
                    attribute.items.map((item) => {
                      return (
                        <div className="item" key={item.id}>
                          {item.value}
                        </div>
                      );
                    })}
                  {attribute.type === "swatch" &&
                    attribute.items.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="color_item cursor_pointer"
                          style={{
                            width: "15px",
                            height: "15px",
                            background: item.value,
                          }}
                        ></div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductCard;
