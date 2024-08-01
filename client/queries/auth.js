import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Query($input: LoginInput) {
    Login(input: $input) {
      token
    }
  }
`;
