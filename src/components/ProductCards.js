import React from "react";
import { productsByCategory } from "../queries";
import { Query } from "@apollo/client/react/components";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

class ProductCards extends React.PureComponent {
  render() {
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
        <Query query={productsByCategory(this.props.category)}>{myQuery}</Query>
      </div>
    );
  }
}

export default ProductCards;
