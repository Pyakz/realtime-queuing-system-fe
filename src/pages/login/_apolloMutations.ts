import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(password: $password, username: $username) {
      access_token
    }
  }
`;

export { LOGIN };
