import { gql } from "@apollo/client";

const FIND_MANY_PERSON = gql`
  query persons($query: PersonPagination!) {
    persons(query: $query) {
      results {
        _id
        name
        address
        cellphoneNumber
        processedAt
        processedBy {
          username
          counterNumber
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
const FIND_PERSON = gql`
  query person($id: String!) {
    person(id: $id) {
      _id
      name
      address
      cellphoneNumber
      processedAt
      processedBy {
        username
        counterNumber
      }
    }
  }
`;
export { FIND_MANY_PERSON, FIND_PERSON };
