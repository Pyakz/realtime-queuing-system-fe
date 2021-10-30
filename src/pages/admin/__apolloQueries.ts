import { gql } from "@apollo/client";

const DASHBOARD = gql`
  query dashboard {
    dashboard {
      totalQueue
      totalPerson
      totalPending
      totalCompleted
      totalCancelled
      averageCompleted
      averageCancelled
    }
  }
`;
export { DASHBOARD };
