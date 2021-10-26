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
const FIND_QUEUE = gql`
  query queue($id: String!) {
    queue(id: $id) {
      _id
      number
      person {
        name
        number
        address
      }
      processedAt
      processedBy {
        counterNumber
      }
    }
  }
`;
export { FIND_MANY_QUEUES, FIND_QUEUE };
