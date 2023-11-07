import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react'
import FilmList from './components/film/FilmList'
import { createApolloClient } from './apollo/createApolloClient'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Film from './pages/Film'
const apolloClient = createApolloClient()

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/film/:filmId" element={<Film />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  )
}
