import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

class Product extends React.Component {
  state = {
    productId: window.location.pathname.split("/")[2],
    displayImage: null,
  };
  componentDidMount () {
    window.scrollTo(0, 0)
  }
  // componentDidMount () {
  //   console.log(window.location.pathname.split("/")[2])
  // }
  changeDisplayImage = (newImage) => {
    this.setState({
      displayImage: newImage,
    })
  }
  render() {
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
        // this.changeDisplayImage(product.gallery[0])
        return (
          (
            <div className="product section">
              <div className="images">
                {product.gallery.map((image, i) => {
                  return (
                    // console.log(this.state.displayImage),
                    <img className={this.state.displayImage === image ? 'active': ''} onClick={() => {this.changeDisplayImage(image)}} key={i} src={image} alt="image_gallery" />
                  );
                })}
              </div>
              <div className="image">
                <img src={this.state.displayImage === null ? product.gallery[0] : this.state.displayImage} alt="main_image" />
              </div>
              <div className="text">
                <h1>{product.name}</h1>
                <p>{product.brand}</p>
                <div className="attributes">
                  {product.attributes.map((attribute) => {
                    return (
                      <div className="attribute uppercase" key={attribute.id}>
                        <h1>{attribute.name}:</h1>
                        <div className="items">
                          {attribute.type !== "swatch" &&
                            attribute.items.map((item) => {
                              return (
                                <div className="item" key={item.id}>
                                  {item.displayValue}
                                </div>
                              );
                            })}
                          {attribute.type === "swatch" &&
                            attribute.items.map((item) => {
                              return (
                                <div
                                  className="color_item cursor_pointer"
                                  style={{
                                    width: "40px",
                                    height: "40px",
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
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </div>
              {/* <h1>{product.name}</h1>
              <p>{product.id}</p>
              <em dangerouslySetInnerHTML={{__html: product.description}}></em> */}
            </div>
          )
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

export default Product;
