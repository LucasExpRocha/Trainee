import useSWR from "swr";
import { request } from "graphql-request";
import { routesBackend } from "../routes/backEnd.routes"

let route: string;

const fetcher = async (query: string) =>
await request(route, query)
.then(res => res.findAllCar)

export const useFindListCars = (query: string) => {
  route = routesBackend()
  return useSWR(query, fetcher);
};