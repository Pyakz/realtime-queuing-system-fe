import { gql } from "@apollo/client";

const CURRENT_QUEUES = gql`
  query Current {
  currentQueueByUser {
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
