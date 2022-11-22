import useSWR from "swr";
import { request, gql } from "graphql-request";

const fetcher = async (query: string) =>
  await request("https://graphql-fiore.herokuapp.com/graphql", query)
    .then(res => res.findCarById)

export const useEditCarByID = (id: string | undefined) => {
  
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