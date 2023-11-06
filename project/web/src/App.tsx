import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import * as React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import FilmList from './components/film/FilmList'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          films: {
            keyArgs: false,
            merge: (
              existing: PaginatedFilms | undefined,
              incoming: PaginatedFilms,
            ): PaginatedFilms => {
              return {
                cursor: incoming.cursor,
                films: exsiting
                  ? [...existing.films, ...incoming.films]
                  : incoming.films,
              }
            },
          },
        },
      },
    },
  }),
})

export const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Text>와 정말 신기해~~</Text>
        <FilmList />
      </Box>
    </ChakraProvider>
  </ApolloProvider>
)
