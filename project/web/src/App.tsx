import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react'
import FilmList from './components/film/FilmList'
import { createApolloClient } from './apollo/createApolloClient'

const apolloClient = createApolloClient()

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Box>
          <Text>와 정말 신기해~~</Text>
        </Box>
        <FilmList />
      </ChakraProvider>
    </ApolloProvider>
  )
}
