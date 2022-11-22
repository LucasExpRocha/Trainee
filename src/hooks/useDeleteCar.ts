import { gql, request  } from "graphql-request";

export async function useDeleteCar(id: string | undefined) {
  const endpoint = "https://graphql-fiore.herokuapp.com/graphql";

  const DELETE_CAR = gql`
    mutation {
      deleteCar(id: ${id})
    }
  `;

  const response = await request(endpoint, DELETE_CAR)

  return response.deleteCar
}

