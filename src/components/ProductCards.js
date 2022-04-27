import React from "react";
import PropTypes from "prop-types";
import { productsByCategory } from "../queries";
import { Query } from "@apollo/client/react/components";
import ProductCard from "./ProductCard";

class ProductCards extends React.PureComponent {
  render() {
    const { category } = this.props;
    const myQuery = ({ data, error, loading }) => {
      if (error) return <p>An error occured</p>;
      if (loading) return <p>Loading...</p>;
      else {
        return data.categoryProducts.products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        });
      }
    };
    return (
      <div className="product_cards">
        <Query query={productsByCategory(category)}>{myQuery}</Query>
      </div>
    );
  }
}

ProductCards.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ProductCards;
