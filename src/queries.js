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
