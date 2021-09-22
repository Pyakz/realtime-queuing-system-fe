import { gql } from "@apollo/client";

const FIND_MANY_PERSON = gql`
  query persons($query: PersonPagination!) {
    persons(query: $query) {
      results {
        name
        address
        cellphoneNumber
        processedAt
        processedBy {
          username
        }
        createdAt
        updatedAt
      }
      total
      pages
      totalFiltered
    }
  }
`;

export { FIND_MANY_PERSON };
