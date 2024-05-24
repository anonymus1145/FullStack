import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// We add the necesary imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, createHttpLink, split
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
);

const splitLink = split(
  ({ query }: { query: boolean })  => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

// The app can comunicate with a GraphQL server using client and the client can be accessed from any component by wrapping the App component with ApolloProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
);
