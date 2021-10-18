import { gql } from "@apollo/client";

const NEW_PENDING = gql`
  subscription PENDINGS($status: status!) {
    newQueue(status: $status) {
      _id
      number
    }
  }
`;

export { NEW_PENDING };
