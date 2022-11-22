import { gql, request  } from "graphql-request";

export async function useEditCar(car: any, endpoint: string) {
  const EDIT_CAR = gql`
    mutation ($car: CarInput) {
      updateCar(car: $car) {
        id
        name
        licensePlate
        manufactureDate
        version
      }
    }
  `;

  const response = await request(endpoint, EDIT_CAR, {
    car
  })

  return response
}

