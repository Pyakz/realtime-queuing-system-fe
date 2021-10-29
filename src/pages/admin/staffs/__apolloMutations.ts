import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUsers($body: CreateUserAccount!) {
    createUser(body: $body) {
      username
      password
    }
  }
`;

export { CREATE_USER };
