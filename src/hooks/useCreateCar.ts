import { gql, request } from "graphql-request";

export async function useCreateCar(car: any) {
  const endpoint = "https://graphql-fiore.herokuapp.com/graphql";

  const CREATE_CAR = gql`
    mutation ($car: CarInput) {
      createCar(car: $car) {
        id
        name
        licensePlate
        manufactureDate
        version
      }
    }
  `;

  const response = await request(endpoint, CREATE_CAR, {
    car
  })

  return response
}

