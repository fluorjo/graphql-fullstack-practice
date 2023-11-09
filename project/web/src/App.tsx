// project/web/src/App.tsx

import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react'
import FilmList from './components/film/FilmList'
import { createApolloClient } from './apollo/createApolloClient'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Film from './pages/Film'
import SignUp from './pages/SignUp'
const apolloClient = createApolloClient()

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/film/:filmId" element={<Film />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  )
}
