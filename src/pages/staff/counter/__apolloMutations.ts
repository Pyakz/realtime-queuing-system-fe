import { gql } from "@apollo/client";

const CREATE_QUEUE = gql`
  mutation CreateQueue($body: QueueInputType!) {
    createQueue(body: $body) {
      number
      person {
        name
      }
    }
  }
`;

export { CREATE_QUEUE };
