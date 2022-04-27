import { gql } from "@apollo/client";

export const getCurrencies = gql`
  query fetchCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const getCategories = gql`
  query fetchCategories {
    scandiwebCategories: categories {
      name
    }
  }
`;

export const fetchProduct = (productId) => {
  return gql`
    query fetchProduct {
      product (id: "${productId}") {
        name
        brand
        id
        inStock
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
};

export const productsByCategory = (category) => {
  return gql`
    query fetchProducts {
      categoryProducts: category(input: {title: "${category}"}) {
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
}
