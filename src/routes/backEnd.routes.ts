import { useParams } from 'react-router-dom'

export function routesBackend () {
  const { backend } = useParams()

  const matchRoutes = (backend: string) => ({
    'ivanildo': 'https://igraphql-api-carros.herokuapp.com/graphql',
    'salatiel': 'https://graphql-fiore.herokuapp.com/graphql',
    'leticia': 'https://api-carro-graphql.herokuapp.com/graphql',
    'juan': 'https://apicarro-phoenix.herokuapp.com/graphql',
    'larissa': 'https://api-graphql-trainee-larissa.herokuapp.com/graphql'
  })[backend]

  return String(matchRoutes(String(backend)))
}