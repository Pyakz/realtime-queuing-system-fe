import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { getAuthToken } from "./token";
// import { get, isEmpty } from "lodash";

const BASE_URL = "localhost:8080";
const PROD_URL = "realtime-queue.herokuapp.com";
const http = process.env.NODE_ENV === "production" ? "https" : "http";
// const URL = process.env.REACT_APP_URL;

const httpLink = createUploadLink({
  uri: `${http}://${
    process.env.NODE_ENV === "production" ? PROD_URL : BASE_URL
  }/graphql`,
}) as unknown as ApolloLink;

const asyncAuthLink = setContext(() => {
  return new Promise((resolve) => {
    return getAuthToken().then((token) =>
      resolve({
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        },
      })
    );
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const websocketLink = new WebSocketLink({
  uri: `ws://${process.env.NODE_ENV ? PROD_URL : BASE_URL}/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => {
      const token = await getAuthToken();

      return {
        authorization: token ? `Bearer ${token}` : "",
      };
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  websocketLink,
  httpLink
);
const retryLink = new RetryLink();
const additiveLink = from([retryLink, asyncAuthLink, errorLink, splitLink]);

// function merge(existing: any, incoming: any) {
//   if (isEmpty(existing)) {
//     return incoming;
//   }
//   const existingItems = get(existing, "items", []);
//   return {
//     ...incoming,
//     items: [...existingItems, ...get(incoming, "items", [])],
//   };
// }
// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {},
//   },
// });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: additiveLink,
});
