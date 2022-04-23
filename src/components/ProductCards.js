import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

class ProductCards extends React.Component {
  render() {
    const getProducts = gql`
    query fetchProducts {
      categoryProducts: category(input: {title: "${this.props.category}"}) {
        name
        products {
        name
        inStock
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
    }
  `;
    const myQuery = ({ data, error, loading }) => {
      if (error) return <p>An error occured</p>;
      if (loading) return <p>Loading...</p>;
      else {
        return data.categoryProducts.products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
            />
          );
        });
      }
    };
    return (
      <div className="product_cards">
        <Query query={getProducts}>{myQuery}</Query>
      </div>
    );
  }
}

export default ProductCards;
