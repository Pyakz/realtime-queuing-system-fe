import { gql } from "@apollo/client";

const CURRENT_QUEUES = gql`
  query Current {
    currentQueueByUser {
      previous {
        _id
        status
        number
      }
      current {
        _id
        number
      }
      next {
        _id
        number
      }
    }
  }
`;

export { CURRENT_QUEUES };
