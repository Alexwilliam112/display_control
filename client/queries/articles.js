import { gql } from "@apollo/client";

export const GET_ALL_DISPLAY = gql`
  query Query {
    GetAllDisplay {
      activeDisplay {
        category
        subcategory
        article
        zones {
          zone
          displayed
          colors {
            color
            displayed
          }
        }
      }
    }
  }
`;

export const SEARCH_DISPLAY = gql`
  query SearchDisplay($input: SearchInput) {
    SearchDisplay(input: $input) {
      activeDisplay {
        category
        subcategory
        article
        zones {
          zone
          displayed
          colors {
            color
            displayed
          }
        }
      }
    }
  }
`;

export const UPDATE_DISPLAY = gql`
  mutation UpdateDisplay($input: UpdateInput) {
    UpdateDisplay(input: $input) {
      status
    }
  }
`;

export const GET_ZONES = gql`
  query Zones {
    getZones {
      zones {
        _id
        zoneName
      }
    }
  }
`;
