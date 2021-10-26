import { gql } from "@apollo/client";

const FIND_MANY_USERS = gql`
  query users($query: UserPagination!) {
    users(query: $query) {
      results {
        _id
        username
        counterNumber
        role
        createdAt
        updatedAt
      }
      pages
      total
      totalFiltered
    }
  }
`;

const FIND_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      _id
      username
      counterNumber
      createdAt
      updatedAt
    }
  }
`;
export { FIND_MANY_USERS, FIND_USER };
