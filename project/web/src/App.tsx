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
import { PaginatedFilms } from './generated/graphql'
import {createApolloClient} from './apollo/createApolloClient'



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
