import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import Button from "../components/Button";

class Product extends React.Component {
  state = {
    productId: window.location.pathname.split("/")[2],
    displayImage: null,
    attributes: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.updateAttributes();
  }
  // componentDidCatch () {
  //   this.updateAttributes()
  // }
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
    const popped = finalAttributes.pop();
    this.setState({
      attributes: finalAttributes,
    });
  };
  render() {
    const addToCart = (product, initialAttributes) => {
      const attributes = [];
      const attrSelected = this.state.attributes.map((attribute) => {
        return attributes.push(attribute.value);
      });
      // return console.log(this.state.attributes)
      if (product.attributes.length === 0) {
        return (
          this.props.addToCart(product, this.state.attributes),
          this.props.throwNoty("Item successfully added to cart"),
          setTimeout(this.props.resetNoty, 3000)
        );
      }
      if ((attributes.includes(undefined) && product.attributes.length > 0) || attributes.length === 0) {
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
    const fetchProduct = gql`
    query fetchProduct {
      product (id: "${this.state.productId}") {
        name
        brand
        id
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
    `;
    const myProductQuery = ({ data, error, loading }) => {
      if (error) return <p>An error occured</p>;
      if (loading) return <p>Loading...</p>;
      if (data.product === null) return <p>No product found</p>;
      else {
        const { product } = data;
        const initialAttributes = this.mapAttributes(product.attributes);
        // this.updateAttributes(product.attributes);
        const price = product.prices.find((price) => {
          return price.currency.symbol === this.props.currency;
        });
        // this.changeDisplayImage(product.gallery[0])
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
                  const findAttr = this.state.attributes.find((attr) => {
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
                                    this.state.attributes.length > 0 &&
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
                                    this.setAttributes({
                                      name: attribute.name,
                                      value: item.value,
                                    }, product.attributes);
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
                onClick={() => addToCart(product, initialAttributes)}
                className="button"
              >
                {/* <div onClick={() => this.props.addToCart({name: product.name, id: product.id, brand: product.brand, gallery: product.gallery})} className="button"> */}
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
        <Query query={fetchProduct}>{myProductQuery}</Query>
        {/* <p>I am the product page for {this.state.productId}</p> */}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
