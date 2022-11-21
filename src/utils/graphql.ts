import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = async (query: string) =>
  await request("https://graphql-fiore.herokuapp.com/graphql", query)

export const useQuery = (query: string) => {
  return useSWR(query, fetcher);
};

