import { gql } from "@apollo/client";

const FIND_MANY_QUEUES = gql`
  query queues($query: Pagination!) {
    queues(query: $query) {
      total
      pages
      totalFiltered
      results {
        _id
        number
        status
        person {
          name
          address
        }
        processedBy {
          counterNumber
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export { FIND_MANY_QUEUES };
