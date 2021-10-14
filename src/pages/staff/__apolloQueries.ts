import { gql } from "@apollo/client";

const FIND_MANY_QUEUES = gql`
  query Queues($query: Pagination!) {
    queues(query: $query) {
      results {
        _id
        status
        number
      }
      total
      totalFiltered
      pages
    }
  }
`;

export { FIND_MANY_QUEUES };
