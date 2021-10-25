import { gql } from "@apollo/client";

const CHANGE_STATUS = gql`
  mutation changeStatusQueue($body: updateStatusQueue!) {
    updateQueueStatus(body: $body) {
      previous {
        _id
        status
        number
      }
      next {
        _id
        number
      }
      current {
        _id
        number
      }
    }
  }
`;

export { CHANGE_STATUS };
