import { gql, DocumentNode } from "@apollo/client";

// GET_CURRENCIES provides the list of currencies based on the $currency parameter
export const GET_CURRENCIES: DocumentNode = gql`
  query GetRates($currency: String!) {
    rates(currency: $currency) {
      currency
      name
      rate
    }
  }`;