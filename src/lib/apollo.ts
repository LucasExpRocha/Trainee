import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://graphql-fiore.herokuapp.com/graphql`,
  cache: new InMemoryCache(),
});
