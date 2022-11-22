import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = async (query: string) =>
  await request("https://graphql-fiore.herokuapp.com/graphql", query)
    .then(res => res.findAllCar)

export const useFindListCars = (query: string) => {
  return useSWR(query, fetcher);
};