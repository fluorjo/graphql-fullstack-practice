// project/web/src/App.tsx

import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { ChakraProvider,  theme } from '@chakra-ui/react'
import { createApolloClient } from './apollo/createApolloClient'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Film from './pages/Film'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  )
}
