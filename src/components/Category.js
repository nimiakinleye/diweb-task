import React from "react";

import ProductCards from './ProductCards'

class Categories extends React.Component {
  render() {
    return (
      <div className="categories section">
        <h1 className="category_name capitalize">{this.props.category}</h1>
        <ProductCards category={this.props.category}/>
      </div>
    );
  }
}

export default Categories;
