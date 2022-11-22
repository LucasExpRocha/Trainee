import { gql, request  } from "graphql-request";

export async function useEditCar(car: any) {
  const endpoint = "https://graphql-fiore.herokuapp.com/graphql";

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

  console.log(car)

  const response = await request(endpoint, EDIT_CAR, {
    car
  })

  return response
}

