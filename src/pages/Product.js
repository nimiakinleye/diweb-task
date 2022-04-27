import React from "react";
import PropTypes from "prop-types";
import { fetchProduct } from "../queries";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import Button from "../components/Button";

class Product extends React.PureComponent {
  state = {
    productId: window.location.pathname.split("/")[2],
    displayImage: null,
    attributes: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  changeDisplayImage = (newImage) => {
    this.setState({
      displayImage: newImage,
    });
  };
  mapAttributes = (attributes) => {
    const attributesArray = [];
    attributes.forEach((attribute) => {
      const attributeProp = { name: attribute.id, value: attribute.value };
      attributesArray.push(attributeProp);
    });
    return attributesArray;
  };
  updateAttributes = (attributes) => {
    const attributesArray = this.mapAttributes(attributes);
    this.setState({
      attributes: attributesArray,
    });
  };
  setAttributes = (attribute, attributes) => {
    if (this.state.attributes.length === 0) {
      this.updateAttributes(attributes);
      setTimeout(this.changeAttributeValue, 0, attribute);
    } else {
      this.changeAttributeValue(attribute);
    }
  };
  changeAttributeValue = (attribute) => {
    const findAttribute = this.state.attributes.find((thisAttribute) => {
      return thisAttribute.name === attribute.name;
    });
    const finalAttributes = [
      ...this.state.attributes,
      (findAttribute.value = attribute.value),
    ];
    finalAttributes.pop();
    this.setState({
      attributes: finalAttributes,
    });
  };
  render() {
    const { props, state, setAttributes } = this;
    const { productId, attributes } = state;
    const { currency, addToCart, throwNoty, resetNoty } = props;
    const onAddToCart = (product, initialAttributes) => {
      if (!product.inStock) {
        return (
          throwNoty("Product is not in stock"), setTimeout(resetNoty, 3000)
        );
      }
      const attributesArray = [];
      attributes.map((attribute) => {
        return attributesArray.push(attribute.value);
      });
      if (product.attributes.length === 0) {
        return (
          addToCart(product, this.state.attributes),
          throwNoty("Item successfully added to cart"),
          setTimeout(this.props.resetNoty, 3000)
        );
      }
      if (
        (attributesArray.includes(undefined) &&
          product.attributes.length > 0) ||
        attributesArray.length === 0
      ) {
        return (
          throwNoty("Please select attributes"), setTimeout(resetNoty, 3000)
        );
      } else
        return (
          addToCart(product, attributes),
          throwNoty("Item successfully added to cart"),
          setTimeout(resetNoty, 3000),
          this.setState({
            attributes: initialAttributes,
          })
        );
    };
    const myProductQuery = ({ data, error, loading }) => {
      if (error) return <p>An error occured</p>;
      if (loading) return <p>Loading...</p>;
      if (data.product === null) return <p>No product found</p>;
      else {
        const { product } = data;
        const initialAttributes = this.mapAttributes(product.attributes);
        const price = product.prices.find((price) => {
          return price.currency.symbol === currency;
        });
        return (
          <div className="product section">
            <div className="images">
              {product.gallery.map((image, i) => {
                return (
                  <img
                    className={
                      this.state.displayImage === image ? "active" : ""
                    }
                    onClick={() => {
                      this.changeDisplayImage(image);
                    }}
                    key={i}
                    src={image}
                    alt="image_gallery"
                  />
                );
              })}
            </div>
            <div className="image">
              <img
                src={
                  this.state.displayImage === null
                    ? product.gallery[0]
                    : this.state.displayImage
                }
                alt="main_image"
              />
            </div>
            <div className="text">
              <h1>{product.name}</h1>
              <p>{product.brand}</p>
              <div className="attributes">
                {product.attributes.map((attribute) => {
                  const findAttr = state.attributes.find((attr) => {
                    return attr.name === attribute.name;
                  });
                  return (
                    <div className="attribute uppercase" key={attribute.id}>
                      <h1>{attribute.name}:</h1>
                      <div className="items">
                        {attribute.type !== "swatch" && (
                          <div className="non_color_items">
                            {attribute.items.map((item) => {
                              return (
                                <div
                                  onClick={() => {
                                    this.setAttributes(
                                      {
                                        name: attribute.name,
                                        value: item.value,
                                      },
                                      product.attributes
                                    );
                                  }}
                                  className={`item ${
                                    attributes.length > 0 &&
                                    findAttr.value === item.value
                                      ? "active"
                                      : ""
                                  }`}
                                  key={item.id}
                                >
                                  {item.displayValue}
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
                                  onClick={() => {
                                    setAttributes(
                                      {
                                        name: attribute.name,
                                        value: item.value,
                                      },
                                      product.attributes
                                    );
                                  }}
                                  className={`color_item cursor_pointer ${
                                    this.state.attributes.length > 0 &&
                                    findAttr.value === item.value
                                      ? "active"
                                      : ""
                                  }`}
                                  key={item.id}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    background: item.value,
                                  }}
                                ></div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="price uppercase">
                <h1>price</h1>
                <p>{price.currency.symbol + price.amount}</p>
              </div>
              <div
                onClick={() => onAddToCart(product, initialAttributes)}
                className="button"
              >
                <Button text="add to cart" />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          </div>
        );
      }
    };
    return (
      <>
        <Query query={fetchProduct(productId)}>{myProductQuery}</Query>
      </>
    );
  }
}

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
  throwNoty: PropTypes.func.isRequired,
  resetNoty: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
