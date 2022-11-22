import useSWR from "swr";
import { request, gql } from "graphql-request";
import { routesBackend } from "../routes/backEnd.routes"

let route: string;

const fetcher = async (query: string) =>
  await request("https://api-carro-graphql.herokuapp.com/graphql", query)
    .then(res => res.findCarById)

export const useFindCarByID = (id: string | undefined) => {
  route = routesBackend()
  const QUERY = gql`
    query{
        findCarById(id: ${id}){
          id
          name
          licensePlate
          manufactureDate
          version
        }
      }
  `;

  return useSWR(QUERY, fetcher);
};