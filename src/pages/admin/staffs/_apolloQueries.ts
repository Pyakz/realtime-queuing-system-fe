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

export { FIND_MANY_USERS };
