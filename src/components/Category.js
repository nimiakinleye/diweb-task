import React from "react";
import PropTypes from "prop-types";

import ProductCards from "./ProductCards";

class Categories extends React.PureComponent {
  render() {
    const { props } = this;
    const { category } = props;
    return (
      <div className="categories section">
        <h1 className="category_name capitalize">{category}</h1>
        <ProductCards category={category} />
      </div>
    );
  }
}

Categories.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Categories;
