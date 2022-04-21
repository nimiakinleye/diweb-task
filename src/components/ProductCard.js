import React from "react";
import Cart from "../assets/icons/whiteCart.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductCard extends React.Component {
  state = {
    attributes: [],
  };
  componentDidMount() {
    this.updateAttributes();
  }
  mapAttributes = () => {
    const attributes = [];
    this.props.product.attributes.forEach((attribute) => {
      // attributes[`${attribute.id}`] = null
      const attributeProp = { name: attribute.id, value: attribute.value };
      attributes.push(attributeProp);
    });
    return attributes;
  }
  updateAttributes = () => {
    const attributes = this.mapAttributes()
    this.setState({
      attributes: attributes,
    });
  };
  setAttributes = (attribute, attributes = this.state.attributes) => {
    const findAttribute = attributes.find((thisAttribute) => {
      return thisAttribute.name === attribute.name;
    });
    const finalAttributes = [
      ...attributes,
      (findAttribute.value = attribute.value),
    ];
    const popped = finalAttributes.pop();
    this.setState({
      attributes: finalAttributes,
    });
  };
  render() {
    const initialAttributes = this.mapAttributes();
    const addToCart = (product) => {
      const attributes = [];
      const attrSelected = this.state.attributes.map((attribute) => {
        return attributes.push(attribute.value);
      });
      if (attributes.includes(undefined)) {
        return (
          this.props.throwNoty("Please select attributes"),
          setTimeout(this.props.resetNoty, 3000)
        );
      } else
        return (
          this.props.addToCart(product, this.state.attributes),
          this.props.throwNoty("Item successfully added to cart"),
          setTimeout(this.props.resetNoty, 3000),
          this.setState({
            attributes: initialAttributes,
          })
        );
    };
    const { product } = this.props;
    const price = product.prices.find((price) => {
      return price.currency.symbol === this.props.currency;
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
          <div
            onClick={() => {
              addToCart(product);
            }}
            className="cartIcon cursor_pointer"
            data-tooltip="Add to cart"
          >
            <img src={Cart} alt="" />
          </div>
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
        <div className="attributes">
          {product.attributes.map((attribute) => {
            const findAttr = this.state.attributes.find((attr) => {
              return attr.name === attribute.name;
            });
            return (
              (
                <div className="attribute uppercase" key={attribute.id}>
                  <p>{attribute.name}:</p>
                  <div className="items">
                    {attribute.type !== "swatch" && (
                      <div className="non_color_items">
                        {attribute.items.map((item) => {
                          return (
                            <div
                              className={`item ${
                                this.state.attributes.length > 0 &&
                                findAttr.value === item.value
                                  ? "active"
                                  : ""
                              }`}
                              key={item.id}
                              onClick={() => {
                                this.setAttributes({
                                  name: attribute.name,
                                  value: item.value,
                                });
                              }}
                            >
                              {item.value}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {attribute.type === "swatch" && (
                      <div className="color_items">
                        {attribute.items.map((item) => {
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                this.setAttributes({
                                  name: attribute.name,
                                  value: item.value,
                                });
                              }}
                              className={`color_item cursor_pointer ${
                                this.state.attributes.length > 0 &&
                                findAttr.value === item.value
                                  ? "active"
                                  : ""
                              }`}
                              style={{
                                width: "15px",
                                height: "15px",
                                background: item.value,
                              }}
                            ></div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    );
  }
}

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
