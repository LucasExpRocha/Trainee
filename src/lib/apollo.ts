import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useParams } from "react-router-dom";

const x = 4000

export const client = new ApolloClient({
  uri: `http://localhost:${x}`,
  cache: new InMemoryCache(),
});
